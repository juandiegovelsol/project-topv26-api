import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const isAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await prisma.user.findFirst({
      where: {
        iduser: +id,
      },
    });
    if (admin.role === "admin") {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
