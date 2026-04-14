import express from "express";
import {
  create,
  myBookings,
  approve,
  reject
} from "../controllers/booking.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/", authenticate, create);

router.get("/me", authenticate, myBookings);

router.patch("/:id/approve", authenticate, approve);

router.patch("/:id/reject", authenticate, reject);

export default router;
