import User from "../models/user";
import { signInValid, signUpValid } from "../validation/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { error } = signUpValid.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).josn({
        message: "Email da duoc su dung",
      });
    }
    const hashPassword = await bcryptjs.hash(req.body.password, 10);
    // console.log("hashPassword", hashPassword);

    const user = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
    });
    user.password = "undefined";
    return res.status(201).json({
      message: "Tao tai khoan thanh cong !",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    // B1: Validation data from client
    const { error } = signInValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        messages: errors,
      });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "Email này chưa được đăng ký",
      });
    }
    // B3: So sánh password ?
    // console.log(user);
    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    // console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không đúng, vui lòng nhập lại!",
      });
    }
    // B4: Tạo jwt
    const accessToken = jwt.sign({ _id: user.id }, "ok", { expiresIn: "1d" });
    // B5: Response thông tin đăng nhập.
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      user,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
