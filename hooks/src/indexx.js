import {express} from "express"
 const app=express()
// https://hooks.zapier.com/hooks/catch/25283401/usgviq7/

app.post("/hooks/catch/:userId/:zapId",(req,res)=>{
	const userId=req.params.userId;
	const zapId=req.params.zapId;

})