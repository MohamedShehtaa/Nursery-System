const express = require("express");
const { studentPostValidation, studentUpdateValidation } = require("../middleware/validation")
const validationResult = require("./../middleware/validationResultMW")
const uploadHandler = require("./../middleware/uploadimg")


const protect = require("../middleware/authMiddleware")
const admin = require("../middleware/adminMiddleware")
const {
    getStudent,
    setStudent,
    updateStudent,
    deleteStudent,
    getStudents,
    updateStudentImage,
} = require("../controllers/studentController");



const router = express.Router();

router.use("/students", protect)

router.route("/students")
    .post(uploadHandler("students"), studentPostValidation, validationResult, setStudent)//admin, studentPostValidation, validationResult, setStudent)
    .put(admin, studentUpdateValidation, validationResult, updateStudent)
    .get(getStudents)

router.put("/students/profile", uploadHandler("students"), protect, admin, updateStudentImage)


router.route("/students/:id")
    .get(getStudent)
    .delete(admin, deleteStudent)


module.exports = router;