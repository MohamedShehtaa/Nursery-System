const mongoose = require("mongoose");
const path = require('path')

const AutoIncrement = require('mongoose-sequence')(mongoose);


const addressSchema = mongoose.Schema({
    _id: false,
    city: { type: String, require: true },
    street: { type: String, require: true },
    building: { type: String, require: true }
})

const studentSchema = mongoose.Schema(
    {
        _id: {
            type: Number,
        },
        fullName: {
            type: String,
            required: [true, "Please add a name"],
        },

        age: {
            type: Number,
            min: 1,
            max: 10,
            require: [true, "Please add an age"]
        },


        level: {
            type: String,
            enum: ['PreKG', 'KG1', 'KG2'],
            required: true,
        },
        address: {
            type: addressSchema,
            required: [true, "Please add an address"]
        },
        image: {
            type: String,
            default: "\\images\\students\\student.jpg"
        }
    },
    {
        timestamps: true,
    }
);

studentSchema.plugin(AutoIncrement, { id: "StudentCounter" });
module.exports = mongoose.model("Student", studentSchema);
