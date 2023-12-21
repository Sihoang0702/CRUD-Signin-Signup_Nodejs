import express from "express";
import router from "./routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { PORT, DB_URL } = process.env;
const app = express();
app.use(express.json());
mongoose.connect(`${DB_URL}`).then(() => console.log("Connected!"));
app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
