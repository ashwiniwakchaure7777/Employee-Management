import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const EditEmployee = () => {
  
  const { id } = useParams(); // Get employee ID from URL params
  console.log(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", 
    email: "",
    phone: "",
    gender: "",
    designation: "",
    course: [],
    employeeAvatar: null,
  });

  useEffect(() => {
    // Fetch the employee data by ID and pre-fill the form
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/employee/getdetails/${id}`);
        console.log(response);
        const { name, email, phone, gender, designation, course } = response.data.employee;
        setFormData({
          name,
          email,
          phone,
          gender,
          designation,
          course,
          employeeAvatar: null, // Initialize with null; allow user to upload new image if needed
        });
      } catch (error) {
        toast.error("Failed to fetch employee data");
        navigate("/employeelist");
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "checkbox") {
      setFormData(prevState => ({
        ...prevState,
        course: prevState.course.includes(value)
          ? prevState.course.filter(course => course !== value)
          : [...prevState.course, value],
      }));
    } else if (type === "file") {
      setFormData({ ...formData, employeeAvatar: files[0] });
    } else if (type === "radio") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditEmployee = async (e) => {
    e.preventDefault();

    
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("designation", formData.designation);
      form.append("gender", formData.gender);
      form.append("course", formData.course.join(","));
      if (formData.employeeAvatar)
        form.append("employeeAvatar", formData.employeeAvatar);
      console.log(form)
      const response = await axios.put(
        `http://localhost:4000/api/v1/employee/update/${id}`,
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    
      toast.success(response.data.message);
      navigate("/employeelist");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="h-screen to-blue-50">
      <Navbar />
      <div className="h-screen flex flex-col items-center mt-16 shadow-xl">
        <form onSubmit={handleEditEmployee}>
          <div className="bg-blue-100 p-5 rounded-lg ">
            {/********* Name *********/}
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-lg font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pr-60 pl-1 py-1 rounded-md my-1"
                placeholder="Enter name"
              />
            </div>

            {/********* Email *********/}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pr-40 pl-1 py-1 rounded-md my-1"
                placeholder="Enter email"
              />
            </div>

            {/********* Phone *********/}
            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-lg font-semibold">
                Mobile No
              </label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="pr-40 pl-1 py-1 rounded-md my-1"
                placeholder="Enter mobile number"
              />
            </div>

            {/********* Dropdown for Designation *********/}
            <div className="flex gap-3 my-2">
              <label htmlFor="designation" className="text-lg font-semibold">
                Designation
              </label>
              <select
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="px-4"
              >
                <option value="">Select an option</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            {/********* Radio Buttons for Gender *********/}
            <div className="flex gap-1 my-3">
              <label htmlFor="gender" className="text-lg font-semibold">
                Gender
              </label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </div>

            {/********* Checkboxes for Course *********/}
            <div className="flex flex-col gap-1">
              <label className="text-lg font-semibold">Course</label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  checked={formData.course.includes("MCA")}
                  onChange={handleChange}
                />
                MCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  checked={formData.course.includes("BCA")}
                  onChange={handleChange}
                />
                BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  checked={formData.course.includes("BSC")}
                  onChange={handleChange}
                />
                BSC
              </label>
            </div>

            {/********* File Upload for Employee Avatar *********/}
            <div className="flex flex-col gap-1">
              <label htmlFor="employeeAvatar" className="text-lg font-semibold">
                Image upload
              </label>
              <input
                type="file"
                id="employeeAvatar"
                name="employeeAvatar"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="text-center py-1 rounded-md bg-blue-800 text-lg font-semibold my-3 text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
