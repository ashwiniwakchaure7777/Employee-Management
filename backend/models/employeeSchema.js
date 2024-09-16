import mongoose from "mongoose";
import validator from "validator";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const employeeSchema = new mongoose.Schema(
  {
    uniqueNumber: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
      validate: [validator.isAlpha, "Please enter characters only"],
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please provide valid email!"],
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid 10-digit phone number!`
      },
    },
    designation: {
      type: String,
      enum: ["HR", "Manager", "Sales"], // Dropdown options
      required: true,
      default: "Select",
    },
    gender: {
      type: String,
      enum: ["Male", "Female"], // Dropdown options
      required: true,
      default: "Select",
    },
    course: {
      type: String,
      enum: ["MCA", "BCA", "BSC"], // Dropdown options
      required: true,
      default: "Select",
    },
    employeeAvatar: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true }
);

employeeSchema.plugin(AutoIncrement, { inc_field: "uniqueNumber" });
export const Employee = mongoose.model("Employee", employeeSchema);
