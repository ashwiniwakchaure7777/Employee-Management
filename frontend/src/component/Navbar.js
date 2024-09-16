import { Link, useNavigate, useParams } from "react-router-dom";

const Navbar = () => {

  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  const handleEmployee = () => {
    navigate("/employeelist");
  };

  return (
    <div className="bg-blue-200 text-xl font-semibold items-center flex justify-between px-20 p-5">
      <div>
        <ul className="flex pl-20 gap-36 ">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/employeelist"}>Employee</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex pr-20 gap-36">
          <li>{userName}</li>
          <li>
            <Link to={"/"}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
