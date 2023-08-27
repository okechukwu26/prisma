import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        password: hash,
      },
    });
    const token = createJWT(user);
    res.status(201);
    res.json({ token });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });
  const verify = await comparePassword(req.body.password, user.password);
  if (!verify) {
    res.status(401).json({ message: "invalid credential" });
    return;
  }
  console.log(verify);

  const token = createJWT(user);
  res.status(201);
  res.json({ token });
};
