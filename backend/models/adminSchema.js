import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongooseSequence from "mongoose-sequence";
import validator from "validator";

const AutoIncrement = mongooseSequence(mongoose);

const adminSchema = new mongoose.Schema({
  sno: {
    type: Number,
  },
  userName: {
    type: String,
    required: true,
    minLength: [5, "username should contain minimum 3 letters!"],
    validate: [validator.isAlpha, "Please enter characters only"],
  },
  password: {
    type: String,
    minLength: [8, "Password must contain 8 characters"],
    required: true,
    select: false,
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

adminSchema.methods.generateJsonWebToken = async function () {
  //sign required primary key, secret key and expiry
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

adminSchema.plugin(AutoIncrement, { inc_field: "sno" });
export const Admin = mongoose.model("Admin", adminSchema);
