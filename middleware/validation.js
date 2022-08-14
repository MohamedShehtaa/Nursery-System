const { body } = require("express-validator");


// CREATE
const classPostValidation = [
    // body("id").isNumeric().withMessage("class id should be a number"),
    body("className").isAlpha('en-US', { ignore: " " }).withMessage("class name should be characters"),
    body("teacher").isAlpha('en-US', { ignore: " " }).withMessage("teacher name should be characters"),
]

const studentPostValidation = [
    // body("id").isNumeric().withMessage("student id should be a number"),
    body("fullName").isAlpha('en-US', { ignore: " " }).withMessage("student name should be characters"),
    body("age").isNumeric({ min: 1, max: 10 }).withMessage("student age is not valid"),
    body("level").isIn(['PreKG', 'KG1', 'KG2']).withMessage("level is not valid"),
    // body("address").isObject().withMessage("address is not valid"),
    // body("address.city").isAlpha('en-US', { ignore: " " }).withMessage("city is not valid"),
    // body("address.street").exists({ checkFalsy: true }).withMessage("street is not valid"),
    // body("address.building").exists({ checkFalsy: true }).withMessage("building is not valid"),
]

const teacherPostValidation = [
    // body("id").isMongoId().withMessage("id is not valid"),
    body("email").isEmail().withMessage("email is not valid"),
    body("role").isIn(["teacher", "admin"]).withMessage("role is not valid"),
    body("password").isString({ min: 8 }).isLength({ min: 8, max: 50 }).withMessage("password cannot be less than 8 characters"),
    body("fullName").isAlpha('en-US', { ignore: " " }).withMessage("teacher name should be characters"),
]

// UPDATE

const classUpdateValidation = [
    body("id").isNumeric().withMessage("class id should be a number"),
    body("className").optional().isAlpha('en-US', { ignore: " " }).withMessage("class name should be characters"),
    body("teacher").optional().isAlpha('en-US', { ignore: " " }).withMessage("teacher name should be characters"),
]

const studentUpdateValidation = [
    body("id").isNumeric().withMessage("student id should be a number"),
    body("fullName").optional().isAlpha('en-US', { ignore: " " }).withMessage("student name should be characters"),
    body("age").optional().isNumeric({ min: 1, max: 10 }).withMessage("student age is not valid"),
    body("level").optional().isIn(['PreKG', 'KG1', 'KG2']).withMessage("level is not valid"),
    body("address").optional().isObject().withMessage("address is not valid"),
    body("address.city").optional().isAlpha('en-US', { ignore: " " }).withMessage("city is not valid"),
    body("address.street").optional().exists({ checkFalsy: true }).withMessage("street is not valid"),
    body("address.building").optional().exists({ checkFalsy: true }).withMessage("building is not valid"),
]

const teacherUpdateValidation = [
    body("id").isMongoId().withMessage("id is not valid"),
    body("email").optional().isEmail().withMessage("email is not valid"),
    body("role").optional().isIn(["teacher", "admin"]).withMessage("role is not valid"),
    body("password").optional().isString({ min: 8 }).isLength({ min: 8, max: 50 }).withMessage("password cannot be less than 8 characters"),
    body("fullName").optional().isAlpha('en-US', { ignore: " " }).withMessage("teacher name should be characters"),
]

module.exports = {
    classPostValidation,
    studentPostValidation,
    teacherPostValidation,
    classUpdateValidation,
    studentUpdateValidation,
    teacherUpdateValidation
}