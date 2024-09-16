import express from "express";
import  {login,adminRegister} from "../controller/adminController.js";


const router = express.Router();

router.post("/register",adminRegister);
router.post("/login",login);


export default router;