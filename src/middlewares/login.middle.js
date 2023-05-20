import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    console.log(user);
    req.body = {
      email,
      password,
      iduser: user.iduser,
      name: user.name,
      lastname: user.lastname,
      role: user.role,
    };
    const isValidUser = bcrypt.compareSync(password, user.password);
    if (isValidUser) {
      next();
    } else {
      res
        .status(401)
        .json({ error: true, message: "invalid user or password" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};
