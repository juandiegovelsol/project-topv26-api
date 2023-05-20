import express from "express";
import { createOrder, getAllOrders } from "../controllers/order.controller.js";
import { isAuthenticaded } from "../middlewares/isAuthenticaded.middle.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);

export default router;
