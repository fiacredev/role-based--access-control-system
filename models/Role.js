import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true }, // e.g., "Student", "Faculty", "Admin"
    description: { type: String },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Role", roleSchema);
