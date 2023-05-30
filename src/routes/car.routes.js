import express from "express";
import {
  createCar,
  getAllCars,
  updateQuantity,
  getOneCar,
} from "../controllers/car.controller.js";
import { isAuthenticaded } from "../middlewares/isAuthenticaded.middle.js";
import { isAdmin } from "../middlewares/isAdmin.middle.js";

const router = express.Router();

router.post("/:id", isAuthenticaded, isAdmin, createCar);
router.get("/:id", isAuthenticaded, isAdmin, getAllCars);
router.put("/:id/:id2", isAuthenticaded, isAdmin, updateQuantity);
router.get("/info/:id", isAuthenticaded, getOneCar);

export default router;
