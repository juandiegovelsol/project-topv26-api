import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
} from "../controllers/order.controller.js";
import { isAuthenticaded } from "../middlewares/isAuthenticaded.middle.js";

const router = express.Router();

router.post("/", isAuthenticaded, createOrder);
router.get("/auth/:id", isAuthenticaded, getAllOrders);
router.get("/:id", isAuthenticaded, getUserOrders);

export default router;
