import jwt from "jsonwebtoken";

const secret = "Rohit$123";
// You can switch to: const secret = process.env.JWT_SECRET; for better security.

function setUser(user) {
  return jwt.sign({ user }, secret);
}

function getUser(token) {
  try {
    return jwt.verify(token, secret).user;
  } catch (err) {
    return null;
  }
}

export { setUser, getUser };
