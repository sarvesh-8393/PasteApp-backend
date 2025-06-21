
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); 

const JWT_SECRET = process.env.PORT;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user data to request
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
