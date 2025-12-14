import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, "mysecretkey");
    req.user = decoded.user; // store only user
    next();
  } catch (err) {
    return res.status(401).send("Invalid token.");
  }
};

export default auth;
