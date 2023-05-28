import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const generateToken = (req, res) => {
  try {
    const { email, iduser, name, lastname, role, image } = req.body;
    const payload = { iduser, email, name, lastname, role, image };
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
    const image =
      "https://res.cloudinary.com/dprkaqz8q/image/upload/v1685221026/tesla-logo-01_geitm6.jpg";
    const user = await prisma.user.create({
      data: { email, password: hash, name, lastname, role, image },
    });
    const {
      email: email1,
      name: name1,
      lastname: lastname1,
      role: role1,
      image: image1,
    } = user;
    res.status(201).json({ email1, name1, lastname1, role1, image1 });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { email, password, name, lastname, image } = req.body;
    const hash = bcrypt.hashSync(password, 12);
    const updatedUser = await prisma.user.update({
      where: {
        iduser: +id,
      },
      data: {
        email: email,
        password: hash,
        name: name,
        lastname: lastname,
        image: image,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const changeRole = async (req, res) => {
  const { id2 } = req.params;
  try {
    const user = await prisma.user.findFirst({
      where: {
        iduser: +id2,
      },
    });

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
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        iduser: true,
        email: true,
        name: true,
        lastname: true,
        role: true,
        image: true,
      },
    });
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findFirst({
      where: {
        iduser: +id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
