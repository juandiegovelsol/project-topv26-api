import express from "express";
import userRoutes from "./routes/user.routes.js";
import carRoutes from "./routes/car.routes.js";
import orderRoutes from "./routes/order.routes.js";
import emailRoutes from "./routes/email.routes.js";
import cors from "cors";

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello project back-end API" });
});
app.use("/auth/local", userRoutes);
app.use("/car", carRoutes);
app.use("/order", orderRoutes);
app.use("/email", emailRoutes);

app.listen(PORT, () => {
  console.log(`Initialized asessment server on port ${PORT}...`);
});
