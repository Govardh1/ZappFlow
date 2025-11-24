import type { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "./config.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    const payload = Jwt.verify(token, JWT_USER_SECRET) as { id: number; email: string };

   
    // @ts-ignore
    req.id =  Number(payload.id);

    next();
  } catch (e) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
