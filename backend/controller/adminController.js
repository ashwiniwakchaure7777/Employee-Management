import catchAsyncError  from "../middlewares/catchAsyncError.js";
import  {Admin} from "../models/adminSchema.js";
import generateToken from "../utils/jwtToken.js";


export const adminRegister = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  const { userName, password } = req.body;
  if (!userName || !password) {
    return next(new ErrorHandler("Please fill full form", 400));
  }
  let admin = await Admin.findOne({ userName });
  if (admin) {
    return res.status(400).json({message:"User already registered"});
  }

  admin = await Admin.create({ userName, password ,role:"Admin" });

  generateToken(admin, "Admin registered", 200, res);
  
});

export const login = catchAsyncError(async (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return next(new ErrorHandler("Please provide all details!", 400));
  }

  let admin = await Admin.findOne({ userName }).select("+password");
  console.log(admin);
  if (!admin) {
    console.log("invalid password");
    return res.status(400).json({message:"Invalid Password or username"});
  }

  const isPasswordMatched = await admin.comparePassword(password);
  if (!isPasswordMatched) {
    console.log("invalid password");
    return res.status(400).json({message:"Invalid Password or username"});
  }

  res.cookie('userName',userName,{
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  })
  generateToken(admin, "user LoggedIn successfully", 200, res);
});



