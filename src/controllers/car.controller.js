import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCar = async (req, res) => {
  const { model, color, price, quantity } = req.body;
  try {
    const newCar = await prisma.car.create({
      data: { model, color, price, quantity },
    });
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllCars = async (req, res) => {
  try {
    const allCars = await prisma.car.findMany({});
    res.status(200).json(allCars);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateQuantity = async (req, res) => {
  const { id2 } = req.params;
  try {
    const { quantity } = req.body;
    const car = await prisma.car.update({
      where: {
        idcar: +id2,
      },
      data: {
        quantity: +quantity,
      },
    });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getOneCar = async (req, res) => {
  try {
    const { model, color } = req.body;
    const car = await prisma.car.findFirst({
      where: {
        model: model,
        color: color,
      },
    });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
