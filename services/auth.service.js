import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";
import Permission from "../models/Permission.js"
import { logEvent } from "../utils/audit.helper.js";

const createUserWithRole = async (data, roleName, performedBy = null) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new Error("User already exists");

  const role = await Role.findOne({ name: roleName });
  if (!role) throw new Error(`${roleName} role not found`);

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await User.create({
    fullName: data.fullName,
    email: data.email,
    password: hashedPassword,
    roleId: role._id
  });


  // Let's deal with CREATE AUDIT LOG

  await logEvent({
    action: "USER_CREATED",
    performedBy: performedBy || newUser._id, // self-registration case
    targetUser: newUser._id,
    resourceType: "User",
    resourceId: newUser._id,
    details: `User registered with role ${roleName}`
  });

  return newUser;
  
};


// Registration functions
export const registerStudent = (data) => createUserWithRole(data, "Student");
export const registerFaculty = (data) => createUserWithRole(data, "Faculty");
export const registerAdmin = (data) => createUserWithRole(data, "Admin");
export const registerSuperAdmin = (data) => createUserWithRole(data, "SuperAdmin");



// Login function
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).populate({
    path: "roleId",
    populate: { path: "permissions" } // populate permissions of the role
  });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const userPermissions = user.roleId.permissions.map(p => p.name);

  const token = jwt.sign(
    {
      id: user._id,
      role: user.roleId.name,
      permissions: userPermissions
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.roleId.name,
      permissions: userPermissions
    }
  };
};