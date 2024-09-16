import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "EMPLOYEE_MANAGMENT",
    })
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log(`Some error occured ${err}`);
    });
};

export default dbConnection;
