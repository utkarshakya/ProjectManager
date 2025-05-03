import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { getJwtToken } from "../utils/functions.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, country } = req.body;
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .json({ message: "Email Already Exist, Try Log In" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      country,
    });

    const token = getJwtToken({ userId: user._id });
    res.status(201).json({ token, message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
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
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const profile = await User.findById(userId);
    res.status(200).json({ profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, currentPassword, newPassword, confirmNewPassword, country } =
      req.body;
    const userId = req.userId;
    const user = await User.findById(userId);

    if (currentPassword && newPassword && confirmNewPassword) {
      if (!bcrypt.compare(currentPassword, user.password)) {
        return res.status(400).json({ error: "Current Password Is Wrong" });
      }

      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: "New Password don't match" });
      }

      user.password = await bcrypt.hash(confirmNewPassword, 10);
    }

    user.name = name || user.name;
    user.country = country || user.country;

    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
