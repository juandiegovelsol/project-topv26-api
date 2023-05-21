import express from "express";
import { createCar } from "../controllers/car.controller.js";
import { isAuthenticaded } from "../middlewares/isAuthenticaded.middle.js";
import { isAdmin } from "../middlewares/isAdmin.middle.js";

const router = express.Router();

router.post("/:id", isAuthenticaded, isAdmin, createCar);

export default router;
