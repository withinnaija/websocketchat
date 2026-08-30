import express from "express";
import AppError from "../utils/appError.js";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import { JsonWebTokenError } from "jsonwebtoken";

const router = express.Router();

export const signUp = router.post("/signup", async (req, res, next) => {
  const { email, password, firstName, lastName, profilePic } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    // already register
    if (existingUser) return next(new AppError("user already exist", 409));

    //hash the password coming from user
    const hashedPassword = await bcrypt.hash(password, 10);
    // create new user
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      profilePic,
      firstName,
      lastName,
    });
    // return the new user
    res.status(200).json({
      status: "success",
      email: newUser.email,
    });
    next();
  } catch (error) {
    console.log(error.message);
    next(new AppError("internal error", 500));
  }
});

export const login = router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new AppError("No user Found with the email", 404));
    }

    const confirmPassword = await bcrypt.compare(password, user.password);
    if (!confirmPassword) {
      return next(new AppError("incorrect password", 401));
    }

    next();
  } catch (error) {
    next(new AppError("internal server error", 500));
  }
});

export default router;
