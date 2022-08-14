const asyncHandler = require("express-async-handler");

const ownCreds = asyncHandler(async (req, res, next) => {


    if (req.user._id.toString() === req.body.id || req.user.email === req.body.email) {
        next()
    } else {
        res.status(401);
        throw new Error("Not Authorized Cannot Access");
    }

})

module.exports = ownCreds