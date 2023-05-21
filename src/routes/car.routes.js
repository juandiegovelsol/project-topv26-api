import express from "express";
import { createCar, getAllCars } from "../controllers/car.controller.js";
import { isAuthenticaded } from "../middlewares/isAuthenticaded.middle.js";
import { isAdmin } from "../middlewares/isAdmin.middle.js";

const router = express.Router();

router.post("/:id", isAuthenticaded, isAdmin, createCar);
router.get("/:id", isAuthenticaded, isAdmin, getAllCars);

export default router;
