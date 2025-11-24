import { Router } from "express";
import { authMiddleware } from "../middleware.js";
import prisma from "../lib/prisma.js";
import { signinSchema, signupSchema } from "../types/inde.js";
import jwt from "jsonwebtoken"
import { JWT_USER_SECRET } from "../config.js";
import bcrypt from "bcryptjs";

const router = Router()


router.post("/signup", async (req, res) => {
	const body = req.body;
	const parsedData = signupSchema.safeParse(body);
	if (!parsedData.success) {
		return res.status(400).json({
			msg: "Invalid Inputs"
		})
	}
	const { email, password, name } = parsedData.data;
	console.log(body);

	const userExist = await prisma.user.findFirst({
		where: { email: email }
	})
	if (userExist) {
		return res.status(404).json({ msg: "user alredy exist" })
	}
	const hashed = await bcrypt.hash(password, 10);

	const NewUser = await prisma.user.create({
		data: {
			email: email,
			password: hashed,
			name: name
		}
	})
	console.log(NewUser);


	return res.status(200).json({ msg: "verify your account by checking your email" })
})

router.post("/signin", async (req, res) => {
	const body = req.body;
	const parsedData = signinSchema.safeParse(body);
	if (!parsedData.success) {
		return res.status(400).json({
			msg: "Invalid Inputs"
		})
	}
	const { email, password } = parsedData.data;

	const user = await prisma.user.findFirst({
		where: { email: email }
	});

	if (!user) {
		return res.status(400).json({ msg: "Invalid Credentials" });
	}
	// @ts-ignore
	req.id=user.id;
	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return res.status(400).json({ msg: "Invalid Credentials" });
	}

	const token=jwt.sign({ id: user.id, email: user.email }, JWT_USER_SECRET)
	return res.status(200).json({
		msg: "you are signed in successfully",
		token: token
	})
})

router.get("/", authMiddleware, async (req, res) => {
	// @ts-ignore 
	const id = req.id;
	console.log(id + "from user ep");

	const user = await prisma.user.findFirst({
		where: {
			id
		},
		select: {
			name: true,
			email: true
		}
	})
	return res.status(200).json({
		user
	})
})




export const userRouter = router;
