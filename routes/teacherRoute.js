const express = require("express");
const { teacherPostValidation, teacherUpdateValidation } = require("../middleware/validation")
const validationResult = require("./../middleware/validationResultMW");
const uploadHandler = require("./../middleware/uploadimg")

const protect = require("../middleware/authMiddleware")
const admin = require("../middleware/adminMiddleware")
const own = require("../middleware/own")
const {
    getTeacher,
    updateTeacher,
    deleteTeacher,
    getTeachers,
    updateTeacherImg,
    changePassword,
    resetPassword,
    forgetPassword
} = require("../controllers/teacherController");

const { registerUser, loginUser } = require("../controllers/userController")

const router = express.Router();

// router.use(["/teachers", "/teachers/:id", "/teachers/register"], protect, admin)

router.route("/teachers")
    .get(protect, admin, getTeachers)
    .put(protect, teacherUpdateValidation, validationResult, updateTeacher)

router.put("/teachers/profile", uploadHandler("teachers"), protect, own, updateTeacherImg)

router.route("/teachers/:id")
    .get(protect, admin, getTeacher)
    .delete(protect, admin, deleteTeacher)

router.route("/teachers/register").post(uploadHandler("teachers"), protect, own, teacherPostValidation, validationResult, registerUser)
router.route("/teachers/login").post(loginUser)
router.route("/teachers/changepassword").post(protect, own, changePassword)
router.route("/teachers/forgetpassword").post(forgetPassword)
router.route("/teachers/resetpassword").post(resetPassword)

module.exports = router;