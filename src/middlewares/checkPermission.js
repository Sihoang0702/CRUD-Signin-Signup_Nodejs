import jwt from "jsonwebtoken";
import User from "../models/user";

export const checkPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).json({
        message: "Ban chua dang nhap",
      });
    }
    const decoded = jwt.verify(token, "ok");
    if (!decoded) {
      throw new Error("JWT Error");
    }
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(400).json({
        message: "User không tồn tại trong hệ thống!",
      });
    }
    if (user.role !== "admin") {
      return res.status(400).json({
        message: "Bạn không có quyền làm việc này!",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
