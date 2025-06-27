import { getUser } from '../services/auth.js';

export async function checkUser(req, res, next) {
  const userId = req.cookies?.uid;
  console.log(userId);
  if (!userId) {
    console.log("User not found");
    return next();
  }

  const user = await getUser(userId);
  if (!user) {
    return next();
  }

  req.user = user;
  next();
}

export async function checkAdmin(req, res, next) {
  const user = req.user;
  if (!user) {
    console.log("value of req.user ->", req.user);
    return res.status(401).json({ message: "Login first", success: false });
  }

  console.log(user);

  if (user.role === "ADMIN") {
    return next();
  }

  return res.status(403).json({ message: "User is not admin", success: false, user: user.role });
}
