import express from "express";
import User from "./../model/user.js";
import authmiddleware from "../middleware/authMiddleware.js";
import AppError from "../utils/appError.js";

const router = express.Router();

export const getUser = router.get(
  "/get-logged-user",
  authmiddleware,
  async (req, res, next) => {
    try {
      const id = req.user.userId;
      const user = await User.findById({ _id: id });
      res.status(200).json({
        message: "user fetch successfully",
        success: true,
        data: user,
      });
    } catch (error) {
      next(new AppError("internal server error ", 500));
    }
  },
);
export const getAllUsers = router.get(
  "/get-all-users",
  authmiddleware,
  async (req, res, next) => {
    try {
      const id = req.user.userId;
      const allUsers = await User.find({ _id: { $ne: id } });
      res.status(200).json({
        message: "all ssers fetch successfully",
        success: true,
        data: allUsers,
      });
    } catch (error) {
      next(new AppError("internal server error ", 500));
    }
  },
);

export default router;
