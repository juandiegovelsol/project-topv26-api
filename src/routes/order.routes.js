import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  adminUpdateOrder,
} from "../controllers/order.controller.js";
import { isAuthenticaded } from "../middlewares/isAuthenticaded.middle.js";
import { isAdmin } from "../middlewares/isAdmin.middle.js";

const router = express.Router();

router.post("/", isAuthenticaded, createOrder);
router.get("/auth/:id", isAuthenticaded, isAdmin, getAllOrders);
router.get("/:id", isAuthenticaded, getUserOrders);
router.put("/:id/:id2", isAuthenticaded, isAdmin, adminUpdateOrder);

export default router;
