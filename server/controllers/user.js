import { User } from '../models/user.js';
import { setUser } from '../services/auth.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function handleSignUp(req, res) {
  const { fullName, email, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    await User.create({
      fullName,
      email,
      password: hash,
    });
    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function handleSignIn(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Enter a valid email", success: false });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(404).json({ message: "Wrong Password" });
    }

    const token = setUser(user);
    res.cookie("uid", token);
    return res.status(200).json({ message: "Login successful", jwtToken: token, user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong", error: err });
  }
}

export async function handleLogout(req, res) {
  return res.status(200).clearCookie('uid').json({ success: true });
}

export async function handleForgotPassword(req, res) {
  const { email } = req.body;
  try {
    console.log("inside try");
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiration = Date.now() + 10 * 60 * 1000;

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpires = expiration;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: 'sikarwarrr315@gmail.com',
        pass: 'krlt hrcr uuje rawa',
      },
      connectionTimeout: 10000,
    });

    const mailOptions = {
      from: {
        name: "Movie Review",
        address: "sikarwarrr315@gmail.com",
      },
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP has been sent to your email' });
  } catch (err) {
    console.log("inside catch", err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function handleResetPassword(req, res) {
  console.log("from reset-password...");
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({
      email,
      resetPasswordOtp: otp,
      // resetPasswordOtpExpires: { $gt: Date.now() } // uncomment if checking expiry
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(newPassword, salt);
    user.password = hash;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpires = undefined;
    await user.save();

    res.status(200).clearCookie('uid').json({ message: 'Password has been successfully reset and logout' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function handleChangeRole(req, res) {
  const { id, role } = req.body;
  if (!req.user) {
    return res.status(404).json({ message: "Login first...", success: false });
  }
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "User is not admin", success: false });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  user.role = role;
  await user.save();
  return res.status(200).json({ message: "Role changed successfully", success: true });
}
