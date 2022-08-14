const multer = require("multer")
const path = require("path")


const uploadHandler = (folderName) => {


    const storage = multer.diskStorage({
        destination: `./images/${folderName}/`,
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
        },
        onError: function (err, next) {
            console.log('error', err);
            next(err);
        }
    })

    const upload = multer({
        storage
    }).single("image")

    return upload

}

module.exports = uploadHandler