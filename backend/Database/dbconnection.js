import mongoose from "mongoose";
mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.Mongo_URI);
    if (conn) {
        console.log("Database connected successfully");
    }
    else{
        console.log("Database connection failed!");
    }
  } catch (error) {
    console.log("Database connection failed! ", error);
  }
};

export default connectDB;