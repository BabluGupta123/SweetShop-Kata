const adminOnly = (req, res, next) => {
  // req.user is set by auth middleware
  if (!req.user || !req.user.admin) {
    return res.status(403).send("Access denied. Admin only");
  }
  next();
};

export default adminOnly;
