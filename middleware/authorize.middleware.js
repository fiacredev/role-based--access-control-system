export const authorize = ({ roles = [], permissions = [] }) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roleId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const userRole = req.user.roleId.name;

    const userPermissions = req.user.roleId.permissions.map(p => p.name);

    // SuperAdmin bypass
    if (userRole === "SuperAdmin") return next();

    const hasRole = roles.length ? roles.includes(userRole) : false;
    const hasPermission = permissions.length
      ? permissions.some(p => userPermissions.includes(p))
      : false;

    if (!hasRole && !hasPermission) {
      return res.status(403).json({ message: "Forbidden: insufficient permiissions" });
    }

    next();
  };
};
