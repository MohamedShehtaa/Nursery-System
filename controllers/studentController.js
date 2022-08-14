const Student = require("../models/studentModel");
const checkUpdate = require("../middleware/update");
const fs = require('fs');

const getStudent = async (req, res, next) => {
    try {
        const student = await Student.findOne({ _id: req.params.id })
        if (!student) {
            throw new Error("Wrong student id")
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(400)
        next(error)
    }
};


const setStudent = async (req, res, next) => {
    const image = req.file ? req.file.path : undefined

    try {
        console.log(`${process.cwd()}\\${image}`)

        console.log(req.body)
        console.log(req.file)
        const { id, fullName, age, level, city, street, building } = req.body
        const address = { city, street, building }
        const student = await Student.create({ _id: id, fullName, age, level, address, image })
        if (!student) throw new Error("Wrong data")
        res.status(201).json({ message: "Created" })
    } catch (error) {

        res.image = `${process.cwd()}\\${image}`
        res.status(400)
        next(error)
    }
};


const updateStudent = async (req, res, next) => {
    try {
        console.log(req.body)
        const student = await Student.findOne({ _id: req.body.id });

        if (!student) {
            throw new Error("Wrong student id")
        }
        checkUpdate(req.body, student)
        student.save()
        res.status(202).json({ message: "Modified" });
    } catch (error) {
        res.status(400)
        next(error)

    }

};


const deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({ message: "Deleted" });
    } catch (error) {
        res.status(400)
        next(error)
    }
};


const getStudents = async (req, res, next) => {
    try {
        const students = await Student.find({})
        res.status(200).json(students);
    } catch (error) {
        res.status(400)
        next(error)
    }
};


const updateStudentImage = async (req, res, next) => {
    try {
        const image = req.file.path;
        const id = req.body.id;
        const studnet = await Student.findOneAndUpdate({ _id: id }, { image })
        try {
            fs.unlinkSync(`${process.cwd()}\\${studnet.image}`)
            //file removed
        } catch (err) {
            console.error(err)
        }
        res.status(200).json({ message: "Modified" });
    } catch (error) {
        res.status(400)
        next(error)
    }
};



module.exports = {
    getStudent,
    setStudent,
    updateStudent,
    deleteStudent,
    getStudents,
    updateStudentImage
}