const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.SchemaTypes.ObjectId
    },
    fullName: {
      type: String,
      unique: true,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Please add an email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
    },

    role: {
      type: String,
      enum: ['teacher', 'admin'],
      required: true,
    },
    image: {
      type: String,
      default: "\\images\\teachers\\teacher.jpg"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
