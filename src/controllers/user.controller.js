import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const generateToken = (req, res) => {
  try {
    const { email, iduser, name, lastname, role } = req.body;
    const payload = { iduser, email, name, lastname, role };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });
    res.status(200).json({ ...payload, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: false });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, name, lastname, role } = req.body;
    const hash = bcrypt.hashSync(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hash, name, lastname, role },
    });
    const {
      email: email1,
      name: name1,
      lastname: lastname1,
      role: role1,
    } = user;
    res.status(201).json({ email1, name1, lastname1, role1 });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { email, password, name, lastname } = req.body;
    const hash = bcrypt.hashSync(password, 12);
    const updatedUser = await prisma.user.update({
      where: {
        iduser: +id,
      },
      data: { email: email, password: hash, name: name, lastname: lastname },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const changeRole = async (req, res) => {
  const { id, id2 } = req.params;
  try {
    const admin = await prisma.user.findFirst({
      where: {
        iduser: +id,
      },
    });
    const user = await prisma.user.findFirst({
      where: {
        iduser: +id2,
      },
    });

    if (admin.role === "admin") {
      if (user.role === "costumer") {
        try {
          const updatedUser = await prisma.user.update({
            where: {
              iduser: +id2,
            },
            data: { role: "admin" },
          });
          res.status(200).json(updatedUser);
        } catch (error) {
          res.status(500).json({ error: error });
        }
      } else {
        try {
          const updatedUser = await prisma.user.update({
            where: {
              iduser: +id2,
            },
            data: { role: "costumer" },
          });
          res.status(200).json(updatedUser);
        } catch (error) {
          res.status(500).json({ error: error });
        }
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
