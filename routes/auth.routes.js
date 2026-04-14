import express from "express";
import {
  registerStudentController,
  registerFacultyController,
  registerAdminController,
  registerSuperAdminController,
  loginController
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = express.Router();

router.post("/register/student", registerStudentController);
router.post("/register/faculty", registerFacultyController);
router.post("/register/admin", authenticate, authorize(["SuperAdmin"]),registerAdminController);
router.post("/register/superAdmin", registerSuperAdminController);
router.post("/login", loginController);

export default router;


// http://localhost:5000/api/auth/register/student


// import express from "express";
// import { register, login } from "../controllers/auth.controller.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// export default router;