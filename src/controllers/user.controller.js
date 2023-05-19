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
  const { email, password, name, lastname, role } = req.body;
  const hash = bcrypt.hashSync(password, 12);
  const user = await prisma.user.create({
    data: { email, password: hash, name, lastname, role },
  });
  const { email: email1, name: name1, lastname: lastname1, role: role1 } = user;
  res.status(201).json({ email1, name1, lastname1, role1 });
};
