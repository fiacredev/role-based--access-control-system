import express from "express";
import { viewLogs, viewUserLogs, removeLog } from "../controllers/audit.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize({ roles: ["SuperAdmin"] }),
  viewLogs
);

router.get(
  "/user/:userId",
  authenticate,
  authorize({ roles: ["Admin, SuperAdmin"] }),
  viewUserLogs
);

router.delete(
  "/:id",
  authenticate,
  authorize({ roles: ["Admin, SuperAdmin"] }),
  removeLog
);

export default router;
