import express from "express";
import {
  register,
  generateToken,
  updateUser,
  changeRole,
  getAllUsers,
} from "../controllers/user.controller.js";
import { login } from "../middlewares/login.middle.js";
import { passwordSecurity } from "../middlewares/passwordSecurity.middle.js";
import { isAuthenticaded } from "../middlewares/isAuthenticaded.middle.js";
import { isAdmin } from "../middlewares/isAdmin.middle.js";

const router = express.Router();

router.post("/login", login, generateToken);
router.post("/", passwordSecurity, register);
router.put("/:id", passwordSecurity, isAuthenticaded, updateUser);
router.put("/:id/:id2", isAuthenticaded, isAdmin, changeRole);
router.get("/users/:id", isAuthenticaded, isAdmin, getAllUsers);

export default router;
