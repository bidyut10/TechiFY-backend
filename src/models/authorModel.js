const mongoose = require("mongoose");
const validator = require("validator");

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    email: {
      require: true,
      type: String,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
        isAsync: false,
        trim: true
      },
    },
    password: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Author", authorSchema);
