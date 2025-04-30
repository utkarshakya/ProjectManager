import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { getJwtToken } from "../utils/functions.js";

export const register = async (req, res) => {
  const { name, email, password, country } = req.body;
  try {
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .json({ message: "Email Already Exist, Try Log In" });
    }

    const hashedPassword = bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      country,
    });

    const token = getJwtToken({ userId: user._id });
    res.status(201).json({ token, message: "User Created Successfully" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = getJwtToken({ userId: user._id });

    res.status(201).json({ token, message: "Logged In Successfully" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
