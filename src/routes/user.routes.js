import express from "express";
import {
  register,
  generateToken,
  updateUser,
  changeRole,
} from "../controllers/user.controller.js";
import { login } from "../middlewares/login.middle.js";
import { passwordSecurity } from "../middlewares/passwordSecurity.middle.js";
import { isAuthenticaded } from "../middlewares/isAuthenticaded.middle.js";

const router = express.Router();

router.post("/login", login, generateToken);
router.post("/", passwordSecurity, register);
router.put("/:id", passwordSecurity, isAuthenticaded, updateUser);
router.put("/:id/:id2", isAuthenticaded, changeRole);

export default router;
