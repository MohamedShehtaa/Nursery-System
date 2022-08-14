const Teacher = require("../models/userModel");
const bcrypt = require("bcryptjs")
const fs = require('fs');



const getTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findOne({ _id: req.params.id })
        if (!teacher) {
            throw new Error("teacher id is not valid")
        }
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400)
        next(error)
    }
};



const updateTeacher = async (req, res, next) => {
    try {
        console.log(req.body)
        const teacher = await Teacher.findOneAndUpdate(
            { _id: req.body.id },
            req.body);
        if (!teacher) {
            throw new Error("teacher id is not valid")
        }

        res.status(202).json({ message: "Modified" });
    } catch (error) {
        res.status(400)
        next(error)

    }

};


const deleteTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findOneAndDelete({ _id: req.params.id })
        if (!teacher) {
            throw new Error("teacher id is not valid")
        }

        res.status(200).json({ message: "Deleted" });
    } catch (error) {
        res.status(400)
        next(error)
    }
};


const getTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.find({})
        res.status(200).json(teachers);
    } catch (error) {
        res.status(400)
        next(error)
    }
};

const updateTeacherImg = async (req, res, next) => {
    try {
        const image = req.file.path;
        const id = req.body.id;
        const teacher = await Teacher.findOneAndUpdate({ _id: id }, { image })
        try {
            fs.unlinkSync(`${process.cwd()}\\${teacher.image}`)
            //file removed
        } catch (err) {
            console.error(err)
        }
        res.status(200).json({ message: "Modified" });
    } catch (error) {
        res.status(400)
        next(error)
    }
}

const changePassword = async (req, res, next) => {
    try {
        console.log(req.body)
        const { oldPassword, newPassword, email } = req.body
        const teacher = await Teacher.findOne({ email })
        if (teacher && (await bcrypt.compare(oldPassword, teacher.password))) {
            console.log(oldPassword)
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            teacher.password = hashedPassword
            await teacher.save()
            res.status(200).json({ message: "Password Modified" });
        } else {
            res.status(401)
            throw new Error("Worng email or password")
        }
    } catch (error) {
        res.status(400)
        next(error)
    }
}


module.exports = {
    getTeacher,
    updateTeacher,
    deleteTeacher,
    getTeachers,
    updateTeacherImg,
    changePassword
}