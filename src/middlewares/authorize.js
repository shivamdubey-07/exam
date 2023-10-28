const User = require("../models/user");



 const authorize = (requiredRole, requiredPermissions) => {
    return async (req, res, next) => {
      const user = await User.findById(req.userId).exec();
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (user.role !== requiredRole) {
        return res.status(403).json({ message: "Access denied" });
      }
      const hasRequiredPermissions = requiredPermissions.every(
        (permission) => user.permissions.includes(permission)
      );
      if (!hasRequiredPermissions) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }
      next(); 
    };
  };
  