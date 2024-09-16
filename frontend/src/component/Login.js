import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../index";
import {toast} from "react-toastify";
import axios from "axios"

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      console.log(e)
      const response = await axios.post(
        "https://employee-management-p9mr.onrender.com/api/v1/admin/login",
        { userName, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(isAuthenticated);
      localStorage.setItem("userName",userName);
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigate("/adminpanel");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return navigate("/");
  }

  return (
    <div className="flex flex-col mx-auto my-52 shadow-lg w-fit h-fit p-6 rounded-lg bg-blue-200">
      <div className="flex flex-col">
        <label htmlFor="userName" className="text-xl font-bold">
          Username
        </label>
        <input
          type="text"
          className="shadow-xl pr-28 pl-2 py-1 my-4 rounded-md"
          placeholder="Enter username"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></input>
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-xl font-bold">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter password"
          className="shadow-xl pr-28 pl-2 py-1 my-4 rounded-md "
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <button
        onClick={handleLogin}
        className="text-center py-1 rounded-md bg-blue-800 text-lg font-semibold my-3 text-white"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
