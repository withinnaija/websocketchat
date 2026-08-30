// import mongoose from "mongoose";

// mongoose.connect(
//   "mongodb+srv://withinnaija_db_user:pJr1QZFo6xxRUy0M@cluster0.jrvzmo4.mongodb.net/?appName=Cluster0",
// );

// const db = mongoose.connection;

// db.on("connected", () => {
//   console.log("DB connection successfully");
// });

// db.on("err", () => {
//   console.log("DB connection fail");
//   console.log(err.message);
// });

// export default db;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONN_STRING);

    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
