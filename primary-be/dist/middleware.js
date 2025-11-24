import Jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "./config.js";
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ msg: "No token provided" });
    }
    try {
        const payload = Jwt.verify(token, JWT_USER_SECRET);
        // @ts-ignore
        req.id = Number(payload.id);
        next();
    }
    catch (e) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};
