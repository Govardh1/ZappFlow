import Jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "./config.js";
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    try {
        const payload = Jwt.verify(token, JWT_USER_SECRET);
        // @ts-ignore
        req.id = payload.id;
        // @ts-ignore
        console.log(req.id + " from middlware ep");
        next();
    }
    catch (error) {
        return res.status(403).json({
            msg: "you are not logged in"
        });
    }
};
//# sourceMappingURL=middleware.js.map