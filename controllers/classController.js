const Class = require("../models/classModel");
const Teacher = require("../models/userModel");
const Student = require("../models/studentModel");


const getClass = async (req, res, next) => {
    try {
        const classDoc = await Class.findOne({ _id: req.params.id })
        res.status(200).json(classDoc);
    } catch (error) {
        res.status(400)
        next(error)

    }
};


const setClass = async (req, res, next) => {
    try {
        const teacher = await Teacher.findOne({ fullName: req.body.teacher })
        const classDoc = await Class.create({
            teacher: teacher._id,
            className: req.body.className,
            _id: req.body.id,
        })
        res.status(201).json({ message: "Created" })
    } catch (error) {
        res.status(400)
        next(error)

    }
};


const updateClass = async (req, res, next) => {
    try {
        console.log(req.body)
        const classDoc = await Class.findOneAndUpdate(
            { _id: req.body.id },
            req.body)
        res.status(202).json({ message: "Modified" });
    } catch (error) {
        res.status(400)
        next(error)


    }

};


const deleteClass = async (req, res, next) => {
    try {
        const classDoc = await Class.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({ message: "Deleted" });
    } catch (error) {
        res.status(400)
        next(error)

    }
};


const getClasses = async (req, res, next) => {
    try {
        const classes = await Class.find({})
        res.status(200).json(classes);
    } catch (error) {
        res.status(400)
        next(error)

    }
};


const getClassStudents = async (req, res, next) => {
    try {
        const classDoc = await Class.find({ _id: req.params.id })
        const students = classDoc.students
        res.status(200).json(students);
    } catch (error) {
        res.status(400)
        next(error)

    }
};


const getClassTeacher = async (req, res, next) => {
    try {
        const teacherId = await Class.findOne({ _id: req.params.id })
        console.log(teacherId)
        const teacher = await Teacher.find({ _id: teacherId.teacher })
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400)
        next(error)

    }
};


const checkStudents = async (req) => {
    let studentsIds = [...new Set(req.body.studentsIds)]
    let wrongStudentsIds = []
    let correctStudentsIds = []

    let classDoc = await Class.findOne({ _id: req.body.classId });
    if (!classDoc) throw new Error("Class Not found");


    const studentsList = await Student.find({ _id: { $in: studentsIds } });
    let currentStudentsIds = studentsList.map(student => student._id)

    if (currentStudentsIds.length === 0) throw new Error("No Students were found")

    if (currentStudentsIds.length < studentsIds.length) {
        // wrongStudentsIds = studentsIds.filter(id => !currentStudentsIds.includes(id))
        studentsIds.forEach(studentId => {
            if (currentStudentsIds.includes(studentId)) {
                correctStudentsIds.push(studentId)
            } else {
                wrongStudentsIds.push(studentId)
            }
        })
    } else {
        correctStudentsIds = studentsIds
    }
    return { correctStudentsIds, wrongStudentsIds, classDoc }
}

const addClassStudents = async (req, res, next) => {

    // TODO: review error message

    try {
        const { correctStudentsIds, wrongStudentsIds } = await checkStudents(req)
        let classDoc = await Class.findOneAndUpdate({ _id: req.body.classId }, {
            $addToSet: { students: correctStudentsIds }
        }, {
            new: true
        });
        console.log(classDoc)

        res.status(201).json({
            students: classDoc.students,
            correctStudentsIds,
            wrongStudentsIds
        });
    } catch (error) {
        res.status(400);
        next(error)

    }
};

const removeClassStudent = async (req, res, next) => {
    try {
        const { correctStudentsIds, wrongStudentsIds } = await checkStudents(req)
        let classDoc = await Class.findOneAndUpdate({ _id: req.body.classId }, {
            $pullAll: { students: correctStudentsIds }
        }, {
            new: true
        });
        console.log(classDoc)

        res.status(201).json({
            students: classDoc.students,
            correctStudentsIds,
            wrongStudentsIds
        });
    } catch (error) {
        res.status(400);
        next(error)

    }
};




module.exports = {
    getClass,
    setClass,
    updateClass,
    deleteClass,
    getClasses,
    getClassStudents,
    getClassTeacher,
    removeClassStudent,
    addClassStudents
}