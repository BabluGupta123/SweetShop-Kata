import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

/* REGISTER */
export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 5);

  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
  });

  res.status(201).json(user);
};

/*admin registration */
export const registerAdmin = async (req, res) => {
  const { userName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 5);

  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
    admin: true, // 👑 admin role added
  });

  res.status(201).json(user);
};

/* LOGIN */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign({ user }, "mysecretkey", {
    expiresIn: "1h",
  });

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: true,
  });

  res.status(200).send("Login successful");
};

/* PROFILE */
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.status(200).json(user);
};

/* LOGOUT */
export const logoutUser = async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).send("Logout successful");
};
