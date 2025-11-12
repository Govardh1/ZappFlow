import type { NextFunction, Request, Response } from "express"
import  Jwt  from "jsonwebtoken";
import { JWT_USER_SECRET } from "./config.js";

export const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{

	const token =req.headers.authorization as unknown as string;
	console.log(token);
	
	try {
		const payload=Jwt.verify(token,JWT_USER_SECRET)
		// @ts-ignore
		req.id=payload.id
		// @ts-ignore
		console.log(req.id + " from middlware ep");
		
		next()
	} catch (error) {
		 return res.status(403).json({
			msg:"you are not logged in"
		 })
	}

}