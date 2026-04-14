import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, 
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    resourceType: { type: String }, 
    resourceId: { type: mongoose.Schema.Types.ObjectId },
    details: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
