import AuditLog from "../models/AuditLog.js";

export const logEvent = async ({
  action,
  performedBy,
  targetUser = null,
  resourceType = null,
  resourceId = null,
  details = null
}) => {
  await AuditLog.create({
    action,
    performedBy,
    targetUser,
    resourceType,
    resourceId,
    details
  });
};
