import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/dbConfig.js";

dotenv.config({ path: "./config.env" });

connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
