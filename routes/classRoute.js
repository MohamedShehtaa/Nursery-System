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

// /**
//  * @swagger
//  * /classes:
//  *  get:
//  *    description: Use to get all classes
//  *    responses:
//  *      '200':
//  *        description: A successful response
//  */
// /**
//  * @swagger
//  * /classes:
//  *  get:
//  *    description: Use to get all classes
//  *    responses:
//  *      '200':
//  *        description: A successful response
//  */
// router.get("/", protect, getClasses)

// /**
//  * @swagger
//  * /classes:
//  *  post:
//  *    description: Use to create new class
//  *    responses:
//  *      '201':
//  *        description: A successful response
//  */
// router.post("/", protect, admin, setClass)

// /**
//  * @swagger
//  * /classes/id:
//  *  get:
//  *    description: Use to get class by ID
//  *    responses:
//  *      '200':
//  *        description: A successful response
//  */
// router.get("/:id", protect, getClass)

// /**
//  * @swagger
//  * /classes/id:
//  *  patch:
//  *    description: Use to modify class by ID
//  *    responses:
//  *      '200':
//  *        description: A successful response
//  */
// router.patch("/:id", protect, admin, updateClass)

// /**
//  * @swagger
//  * /classes/id:
//  *  delete:
//  *    description: Use to delete class by ID
//  *    responses:
//  *      '200':
//  *        description: A successful response
//  */
// router.delete("/:id", protect, admin, deleteClass)

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