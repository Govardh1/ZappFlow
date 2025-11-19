"use client"
import { AppBar } from "@/components/AppBar";
import { LinkButton } from "@/components/buttons/LinkButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ZapCell } from "@/components/ZapCell";
import { useState } from "react";

export default function(){
	const [selectedTrigger,setSelectedTrigger]=useState("");
	const [selectedAction,setSelectedAction]=useState<{
		availableActionId:string
		availableActionName:string
	}[]>([]);
	
	return <div>
		<AppBar/>
		<div className="w-full h-screen bg-slate-200 flex flex-col items-center justify-center ">
			<div className="flex justify-center">
				<ZapCell name={selectedTrigger ? selectedTrigger : "Trigger"} index={1}></ZapCell>
			</div>
			<div className=" w-full pt-2 pb-2">
				{selectedAction.map((action,index)=><div className="flex justify-center pb-2"><ZapCell name={action.availableActionName? action.availableActionName : "Action"}  key={index} index={2 + index}></ZapCell></div>)}
			</div>

				<PrimaryButton onClick={()=>{
				setSelectedAction(a=>[...a,{availableActionId:"" ,availableActionName:""}
				])
			}}><div className="text-2xl flex flex-col items-center justify-center"> + </div>
			</PrimaryButton>
		</div>
	</div>
}