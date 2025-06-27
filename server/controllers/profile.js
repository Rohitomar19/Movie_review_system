import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { setUser } from '../services/auth.js';

export async function handleGetProfile(req, res) {
  const user = req.user;
  console.log(user);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    return res.status(200).json({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function handleUpdateUser(req, res) {
  const { email, fullName, phone, address } = req.body;

  if (!req.user) {
    console.log("value of req.user ->", req.user);
    return res.status(401).json({ message: "Login first", success: false });
  }

  const user = req.user;

  const id = user._id;
  const updatedUser = await User.findByIdAndUpdate(
    { _id: id },
    {
      email: email,
      fullName: fullName,
      phone: phone,
      address: address,
    },
    { new: true }
  );

  const token = setUser(updatedUser);
  res.cookie("uid", token);
  console.log(user);
  return res
    .status(200)
    .json({ message: "Updated successfully", success: true, updatedUser });
}

export async function handleAdminPage(req, res) {
  const user = req.user;
  console.log(user, "handleAdminPage");
  const allUser = await User.find({});
  return res
    .status(201)
    .json({ allUser: allUser, message: "jai ho", success: true });
}
