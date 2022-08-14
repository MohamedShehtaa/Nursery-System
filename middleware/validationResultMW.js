const { validationResult } = require("express-validator");

module.exports = (request, response, next) => {

    let result = validationResult(request);
    if (!result.isEmpty()) {
        let message = result.errors.reduce((current, error) => current + error.msg + " ", "");
        let error = new Error(message);
        response.status(422);
        const image = request.file ? request.file.path : undefined

        response.image = `${process.cwd()}\\${image}`
        throw error;
    }
    else
        next();

}

