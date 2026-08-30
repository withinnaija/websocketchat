import express, { json } from "express";
import { login, signUp } from "./controller/authController.js";
import globalErrorHandling from "./controller/errorController.js";
import AppError from "./utils/appError.js";

const app = express();
app.use(express.json());

app.use("/api/auth", signUp);
app.use("/api/auth", login);

app.all("/{*splat}", (req, res, next) => {
  next(new AppError(`can't find url with ${req.originalUrl} `, 404));
});

app.use(globalErrorHandling);

export default app;
