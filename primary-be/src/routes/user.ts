import { Router } from "express";
import { authMiddleware } from "../middleware.js";
import { PrismaClient } from "@prisma/client";
import { signinSchema, signupSchema } from "../types/inde.js";
import jwt from "jsonwebtoken"
import { JWT_USER_SECRET } from "../config.js";
const client = new PrismaClient()
const router = Router()

router.post("/signup",async (req, res) => {
	const body = req.body;
	const parsedData = signupSchema.safeParse(body);
	if (!parsedData.success) {
		return res.status(400).json({
			msg:"Invalid Inputs"
		})
	}
	console.log(body);
	
	const userExist =await client.user.findFirst({
		where:{
			email:parsedData.data.username
		}
	})
	if (userExist) {
		return res.status(404).json({msg:"user alredy exist"})
	}

	const NewUser=await  client.user.create({
		data:{
			email:parsedData.data.username,
			password:parsedData.data.password,
			name:parsedData.data.name
		}
	})
	console.log(NewUser);
	

	return res.status(200).json({msg:"verify your account by checking your email"})
})

router.post("/signin",async(req, res) => {
	const body = req.body;
	const parsedData = signinSchema.safeParse(body);
	if (!parsedData.success) {
		return res.status(400).json({
			msg:"Invalid Inputs"
		})
	}
	const user=await client.user.findFirst({
		where:{
			email:parsedData.data.username,
			password:parsedData.data.password
		}
	})
	if (!user) {
		return res.status(400).json({msg:"Invalid Credentials"})
	}
	const token= jwt.sign(parsedData.data.username,JWT_USER_SECRET)
	return res.status(200).json({
		msg:"you are signed in successfully",
		token:token
	})
})

router.get("/", authMiddleware,async(req, res) => {
	// @ts-ignore
	const id= req.id;
	console.log(id +"from user ep");
	
	const user=await client.user.findFirst({
		where:{
			id
		},
		select:{
			name:true,
			email:true
		}
	})
	return res.status(200).json({
		user
	})
})




export const userRouter = router;
