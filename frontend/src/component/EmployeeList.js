import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../../index";
import { toast } from "react-toastify";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const { isAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const employee = await axios.get(
        `https://employee-management-p9mr.onrender.com/api/v1/employee/getdetails/${id}`
      );

      if (!employee.data) {
        toast.error("Employee not found");
        return;
      }

      await axios.delete(`https://employee-management-p9mr.onrender.com/api/v1/employee/delete/${id}`);
      toast.success("Employee deleted successfully");

      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp._id !== id)
      );
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://employee-management-p9mr.onrender.com/api/v1/employee/getall",
          { withCredentials: true }
        );
        setEmployees(response.data);
      } catch (error) {
        toast.error("Failed to fetch employees");
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const gotoCreateEmployee = () => {
    navigate("/createemployee");
  };

  // Function to handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = React.useMemo(() => {
    let sortedData = [...employees];
    if (sortConfig.key !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedData;
  }, [employees, sortConfig]);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = sortedEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={gotoCreateEmployee}
          className="mb-4 py-2 px-4 rounded-md bg-blue-800 text-lg font-semibold text-white"
        >
          Create Employee
        </button>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th
                onClick={() => handleSort("uniqueNumber")}
                className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                ID
              </th>
              <th className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Employee Avatar
              </th>
              <th
                onClick={() => handleSort("name")}
                className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                onClick={() => handleSort("email")}
                className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                Mobile No
              </th>
              <th
                className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                Designation
              </th>
              <th
                className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                Gender
              </th>
              <th
                className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                Course
              </th>
              <th
                onClick={() => handleSort("createdAt")}
                className="cursor-pointer px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                Created At
              </th>
              <th className="px-4 py-2 border-b bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((employee) => (
              <tr key={employee._id}>
                <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                  {employee.uniqueNumber}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                  <img
                    src={employee.employeeAvatar.url}
                    alt="Employee Avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                  {employee.name}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                  {employee.email}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                  {employee.phone}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                  {employee.designation}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                  {employee.gender}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                  {employee.course}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                  {new Date(employee.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                  <div className="flex gap-2">
                    <Link
                      to={`/editemployee/${employee._id}`}
                      className="bg-blue-500 text-white font-bold py-1 px-4 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="bg-red-500 text-white font-bold py-1 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 text-white bg-blue-500 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 text-white bg-blue-500 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
