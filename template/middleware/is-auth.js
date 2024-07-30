const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new CustomError("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const error = new Error("Your session has expired. Please log in again.");
      error.statusCode = 401;
      return next(error);
    } else {
      const error = new Error("Failed to authenticate token.");
      error.statusCode = 500;
      return next(error);
    }
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  req.email = decodedToken.email;

  next();
};
