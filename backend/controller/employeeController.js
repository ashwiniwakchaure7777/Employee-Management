import catchAsyncError from "../middlewares/catchAsyncError.js";
import { Employee } from "../models/employeeSchema.js";
import cloudinary from "cloudinary";

export const addNewEmployee = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({message:"Employee avatar required!"});
  }
  const { employeeAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
  if (!allowedFormats.includes(employeeAvatar.mimetype)) {
    return res.status(400).json({message:"File format not supported!"});
  }
  // console.log(req);
  const { name, email, phone, gender, designation, course } = req.body;
  if (!name || !email || !phone || !gender || !designation || !course) {
    return res.status(400).json({message:"Please fill full form"});
  }

  const isRegistered = await Employee.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(`${isRegistered} with this email already exist!`)
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    employeeAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinary.error || "Unknown Cloudinary Error"
    );
  }

  const employee = await Employee.create({
    name,
    email,
    phone,
    gender,
    designation,
    course,
    employeeAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Employee registered!",
  });
});

export const getAllEmployee = catchAsyncError(async (req, res, next) => {
  try {
    const employee = await Employee.find();
    console.log(employee);
    res.status(200).json(employee);
  } catch (error) {
    return res.status(404).json({message:"Employee data not found"});
  }
});

export const getEmployeeDetails = catchAsyncError(async (req, res, next) => {
  
  const id = req.params.id;
  const employee = await Employee.findById(id);
  if (!employee) {
    return next(new ErrorHandler("User no exists", 404));
  }
  res.status(200).json({ success: true, employee });
});

export const updateEmployee = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id; // Assuming you're updating based on the email
    const updateData = req.body; // The data you want to update
    console.log(updateData);
 
    const updatedEmployee = await Employee.findOneAndUpdate(
      { _id: id }, // Find employee by this condition
      { $set: updateData }, // Update the document with this data
      { new: true } // Return the updated document and run validators
    );
    console.log(updatedEmployee);
    if (!updatedEmployee) {
      return res.status(404).json({message:"Employee not found"});
    }

    res.json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    return res.status(500).json({message:"Server error"});
  }
});

export const deleteEmployee = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const userExist = await Employee.findById(id);
  if (!userExist) {
    return next(new ErrorHandler("User no exists", 404));
  }

  await Employee.findByIdAndDelete(id);

  return res.status(200).json({ msg: "User deleted successfully" });
});
