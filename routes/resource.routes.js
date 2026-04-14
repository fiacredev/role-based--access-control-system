import express from "express";
import { create, getAll, remove, restore } from "../controllers/resource.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAll);

router.post("/" , authenticate, create);

router.delete("/:id", authenticate, remove);

router.patch("/:id/restore", authenticate, restore); 

export default router;
