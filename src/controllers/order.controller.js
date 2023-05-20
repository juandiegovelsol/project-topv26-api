import { PrismaClient } from "@prisma/client";
import { response } from "express";
const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
  const { model, color, user_iduser, adress, state } = req.body;
  try {
    const car = await prisma.car.findFirst({
      where: {
        model: model,
        color: color,
      },
    });
    const { idcar: car_idcar, quantity } = car;
    if (quantity > 0) {
      const newOrder = await prisma.buy_order.create({
        data: { car_idcar, user_iduser, adress, state },
      });
      const modifyCar = await prisma.car.update({
        where: {
          idcar: +car_idcar,
        },
        data: {
          quantity: +quantity - 1,
        },
      });
      console.log(modifyCar);
      res.status(201).json(newOrder);
    } else {
      res.status(500).json({ message: "model not available" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.buy_order.findMany({
      include: {
        user: {
          select: {
            email: true,
            name: true,
            lastname: true,
          },
        },
        car: {
          select: {
            model: true,
            color: true,
            price: true,
          },
        },
      },
    });
    res.status(200).json(orders);
  } catch (error) {}
};
