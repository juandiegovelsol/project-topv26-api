import { PrismaClient } from "@prisma/client";
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
      res.status(201).json(newOrder);
    } else {
      res.status(500).json({ message: "model not available" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllOrders = async (req, res) => {
  try {
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
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUserOrders = async (req, res) => {
  const { id: user_iduser } = req.params;
  try {
    const user_orders = await prisma.buy_order.findMany({
      where: {
        user_iduser: +user_iduser,
      },
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
    res.status(200).json(user_orders);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const adminUpdateOrder = async (req, res) => {
  const { id2 } = req.params;
  try {
    const { state } = req.body;
    const updatedOrder = await prisma.buy_order.update({
      where: {
        idorder: +id2,
      },
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
      data: { state: state },
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const userCancelOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.buy_order.findUnique({
      where: {
        idorder: +id,
      },
    });
    if (order.state === "pending") {
      const canceledOrder = await prisma.buy_order.update({
        where: {
          idorder: +id,
        },
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
        data: { state: "canceled" },
      });
      res.status(200).json(canceledOrder);
    } else {
      if (order.state === "canceled") {
        res
          .status(400)
          .json({ message: "This order has already been canceled" });
      } else {
        res
          .status(400)
          .json({ message: "This order has already been processed" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
