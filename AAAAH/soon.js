// // models/permission.model.js
// import mongoose from "mongoose";

// const permissionSchema = new mongoose.Schema(
//   {
//     name: { type: String, unique: true, required: true }, // e.g., "read_resources"
//     description: { type: String },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Permission", permissionSchema);


// // models/role.model.js
// import mongoose from "mongoose";

// const roleSchema = new mongoose.Schema(
//   {
//     name: { type: String, unique: true, required: true }, // e.g., "SuperAdmin"
//     description: { type: String },
//     permissions: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Permission",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Role", roleSchema);


// // middlewares/authorize.js
// export const authorize = ({ roles = [], permissions = [] }) => {
//   return async (req, res, next) => {
//     try {
//       const user = req.user; // assume authMiddleware already set req.user
//       if (!user) return res.status(401).json({ message: "Unauthorized" });

//       // Populate user's roles and their permissions
//       await user.populate({
//         path: "roles",
//         populate: { path: "permissions" },
//       });

//       // Flatten all user permissions
//       const userPermissions = user.roles.flatMap(r => r.permissions.map(p => p.name));
//       const userRoleNames = user.roles.map(r => r.name);

//       // SuperAdmin shortcut
//       if (userRoleNames.includes("SuperAdmin")) return next();

//       // Check roles OR permissions
//       const hasRole = roles.some(role => userRoleNames.includes(role));
//       const hasPermission = permissions.some(p => userPermissions.includes(p));

//       if (!hasRole && !hasPermission) {
//         return res.status(403).json({ message: "Forbidden: insufficient permissions" });
//       }

//       next();
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   };
// };


// import { authorize } from "../middlewares/authorize.js";

// router.post(
//   "/resources",
//   authMiddleware,
//   authorize({ roles: ["ResourceAdmin"], permissions: ["create_resources"] }),
//   createResource
// );

// router.put(
//   "/resources/:id",
//   authMiddleware,
//   authorize({ permissions: ["update_resources"] }),
//   updateResource
// );

// router.get(
//   "/users",
//   authMiddleware,
//   authorize({ roles: ["SuperAdmin"], permissions: ["read_users"] }),
//   getUsers
// );


// const permissions = [
//   // Booking permissions
//   "booking_create",       // create a booking
//   "booking_viewOwn",      // view own bookings
//   "booking_approve",      // approve a booking
//   "booking_reject",       // reject a booking
//   "booking_viewAll",      // view all bookings

//   // Resource permissions
//   "resource_create",      // create a resource
//   "resource_view",        // view resource details
//   "resource_delete",      // delete a resource

//   // Audit Log permissions
//   "auditLog_view",        // view audit logs
//   "auditLog_create",      // create an audit log entry
//   "auditLog_delete",      // delete audit log entries (admin only)
//   "auditLog_viewUser"     // view audit logs of a specific user
// ];

// export default permissions;


// export default permissions;
