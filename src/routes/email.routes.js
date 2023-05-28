import express from "express";
import { sendEmail } from "../controllers/email.controller.js";

const router = express.Router();

router.get("/", sendEmail);

export default router;
