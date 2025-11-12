import { Router } from "express";
import { authMiddleware } from "../middleware.js";

const router =Router()


router.post("/",authMiddleware,()=>{

})

router.get("/",authMiddleware,()=>{
	
})

router.get("/:zapId",authMiddleware,()=>{
	
})

export const zapRouter=router;