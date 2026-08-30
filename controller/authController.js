import express from "express";
import AppError from "../utils/appError.js";
import user from "../model/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

export const signUp = router.post("/signup", async (req, res, next) => {
  const { email, password, firstName, lastName, profilePic } = req.body;
  try {
    const existingUser = await user.findOne({ email: email });
    // already register
    if (existingUser) return next(new AppError("user already exist", 409));

    //hash the password coming from user
    const hashedPassword = await bcrypt.hash(password, 10);
    // create new user
    const newUser = user.create({
      email: email,
      password: hashedPassword,
      profilePic,
      firstName,
      lastName,
    });
    // return the new user
    res.status(200).json({
      status: "success",
      email: (await newUser).email,
    });
    next();
  } catch (error) {
    console.log(error.message);
    next(new AppError("internal error", 500));
  }
});

export default router;
