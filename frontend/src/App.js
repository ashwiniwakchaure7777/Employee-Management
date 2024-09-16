import React, { createContext, useState, useContext ,useEffect} from "react";
import ReactDOM from "react-dom";
import { Context } from "../index.js";
import Login from "./component/Login";
import AdminPanel from "./component/AdminPanel";
import {BrowserRouter , Routes, Route} from "react-router-dom";
import EmployeeList from "./component/EmployeeList";
import CreateEmployee from "./component/CreateEmployee";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditEmployee from "./component/EditEmployee.js";

const App = () => {

  const {isAuthenticated, setIsAuthenticated, setAdmin} = useContext(Context);
//http://localhost:4000/api/v1/admin/adminpanel
  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://employee-management-p9mr.onrender.com/api/v1/admin/adminpanel",{withCredentials: true});
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  },[isAuthenticated]);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/adminpanel' element={<AdminPanel />}/>
        <Route path='/employeelist' element={<EmployeeList />}/>
        <Route path='/createemployee' element={<CreateEmployee />}/>
        <Route path='/editemployee/:id' element={<EditEmployee />}/>
      </Routes>
      <ToastContainer position='top-center'/>
    </BrowserRouter>
    </>
  )
}

export default App