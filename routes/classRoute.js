const express = require("express");
const { classPostValidation, classUpdateValidation } = require("../middleware/validation")
const validationResult = require("./../middleware/validationResultMW")

const protect = require("../middleware/authMiddleware")
const admin = require("../middleware/adminMiddleware")
const {
    getClass,
    setClass,
    updateClass,
    deleteClass,
    getClasses,
    getClassStudents,
    getClassTeacher,
    removeClassStudent,
    addClassStudents
} = require("../controllers/classController");



const router = express.Router();

router.use("/classes", protect)

router.route("/classes")
    .get(getClasses)
    .post(admin, classPostValidation, validationResult, setClass)
    .put(admin, classUpdateValidation, validationResult, updateClass)
router.route("/classes/:id")
    .get(getClass)
    .delete(admin, deleteClass)




router
    .get("/classstudent/:id", admin, getClassStudents)
router
    .get("/classteacher/:id", admin, getClassTeacher)

router.route("/class/students")
    .delete(admin, removeClassStudent)
    .post(admin, addClassStudents)


module.exports = router;