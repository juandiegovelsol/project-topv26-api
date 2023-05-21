import express from "express";
import { createCar } from "../controllers/car.controller.js";
import { isAuthenticaded } from "../middlewares/isAuthenticaded.middle.js";

const router = express.Router();

router.post("/", createCar);

export default router;
