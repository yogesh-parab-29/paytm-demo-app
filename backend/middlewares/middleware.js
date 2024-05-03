const jwt = require("jsonwebtoken");
import { JWT_SECRET } from "../config";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({});
  }

  const token = authHeader.split(" ")[1];

  try {
    const username = jwt.verify(token, JWT_SECRET);
    req.userId = username.userId;
    next();
  } catch (err) {
    return res.status(403).json({});
  }
};

module.exports =  authMiddleware ;
