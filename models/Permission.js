import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true }, // e.g., "booking_crreate"
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Permission", permissionSchema);
