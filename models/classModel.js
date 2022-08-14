const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


const classSchema = mongoose.Schema({

    _id: {
        type: Number,
    },
    teacher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "Please add a teacher"],
    },
    className: {
        type: String,
        unique: true,
        required: [true, "Please, add a class name"]
    },
    students: {
        type: [Number],
        ref: "Student",
        // required: [true, "Please, add Students"],
        // validate: [value => value < 1, "Class can not be empty"]

    }
}, {
    // _id: false,
    timestamps: true
})
classSchema.plugin(AutoIncrement, { id: "ClassCounter" });
module.exports = mongoose.model("Class", classSchema);
