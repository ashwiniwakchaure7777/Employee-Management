import express from "express";
import {
  addNewEmployee,
  deleteEmployee,
  getAllEmployee,
  getEmployeeDetails,
} from "../controller/employeeController.js";
import { updateEmployee } from "../controller/employeeController.js";

const router = express.Router();

router.post("/createnew", addNewEmployee);
router.get("/getall", getAllEmployee);
router.get("/getdetails/:id", getEmployeeDetails);
router.put("/update/:id", updateEmployee);
router.delete("/delete/:id", deleteEmployee);

export default router;
