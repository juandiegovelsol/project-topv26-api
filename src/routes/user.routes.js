import express from "express";
import { register, generateToken } from "../controllers/user.controller.js";
import { login } from "../middlewares/login.middle.js";
import { passwordSecurity } from "../middlewares/passwordSecurity.middle.js";

const router = express.Router();

router.post("/login", login, generateToken);
router.post("/", passwordSecurity, register);

export default router;
