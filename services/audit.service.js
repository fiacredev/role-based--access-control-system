import AuditLog from "../models/AuditLog.js";

export const createAuditLog = async (data) => {
  return await AuditLog.create(data);
};

export const getAllLogs = async () => {
  return await AuditLog.find()
    .populate("performedBy", "fullName email")
    .populate("targetUser", "fullName email")
    .sort({ createdAt: -1 });
};

export const getUserLogs = async (userId) => {
  return await AuditLog.find({ targetUser: userId })
    .populate("performedBy", "fullName email")
    .sort({ createdAt: -1 });
};

export const deleteLog = async (id) => {
  return await AuditLog.findByIdAndDelete(id);
};
