import Navbar from "./Navbar";

const AdminPanel = () => {
  return (
    <div className="bg-blue-50 h-screen mx-auto my-auto">
      <Navbar />
      <div className=" flex justify-center h-screen text-5xl mt-20 text-center">
        <h1>Welcome to Admin Panel</h1>
      </div>
    </div>
  );
};

export default AdminPanel;
