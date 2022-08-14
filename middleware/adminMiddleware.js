const asyncHandler = require("express-async-handler");

const adminCreds = asyncHandler(async (req, res, next) => {

    if (req.user.role === "admin") {
        next()
    } else {
        res.status(401);
        throw new Error("Not Authorized NOT AN ADMIN");
    }

})

module.exports = adminCreds