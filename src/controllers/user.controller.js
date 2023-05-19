import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const generateToken = (req, res) => {
  try {
    const { email, name } = req.body;
    const payload = { email, name };
    console.log("name", name);
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });
    res.status(200).json({ ...payload, token });
  } catch (error) {
    res.status(500).json({ error: false });
  }
};

export const register = async (req, res) => {
  const { email, password, name, lastname, role } = req.body;
  const hash = bcrypt.hashSync(password, 12);
  const user = await prisma.user.create({
    data: { email, password: hash, name, lastname, role },
  });
  res.status(201).json(user);
};
