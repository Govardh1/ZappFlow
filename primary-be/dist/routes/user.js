import { Router } from "express";
import { authMiddleware } from "../middleware.js";
import { PrismaClient } from "@prisma/client";
import { signinSchema, signupSchema } from "../types/inde.js";
import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "../config.js";
import bcrypt from "bcryptjs";
const client = new PrismaClient();
const router = Router();
router.post("/signup", async (req, res) => {
    const body = req.body;
    const parsedData = signupSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({
            msg: "Invalid Inputs"
        });
    }
    const { username, password, name } = parsedData.data;
    console.log(body);
    const userExist = await client.user.findFirst({
        where: { email: username }
    });
    if (userExist) {
        return res.status(404).json({ msg: "user alredy exist" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const NewUser = await client.user.create({
        data: {
            email: username,
            password: hashed,
            name: name
        }
    });
    console.log(NewUser);
    return res.status(200).json({ msg: "verify your account by checking your email" });
});
router.post("/signin", async (req, res) => {
    const body = req.body;
    const parsedData = signinSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({
            msg: "Invalid Inputs"
        });
    }
    const { username, password } = parsedData.data;
    const user = await client.user.findFirst({
        where: { email: username }
    });
    if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const token = jwt.sign({ username }, JWT_USER_SECRET);
    return res.status(200).json({
        msg: "you are signed in successfully",
        token: token
    });
});
router.get("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id;
    console.log(id + "from user ep");
    const user = await client.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });
    return res.status(200).json({
        user
    });
});
export const userRouter = router;
//# sourceMappingURL=user.js.map