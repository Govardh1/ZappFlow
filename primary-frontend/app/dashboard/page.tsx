"use client"
import { AppBar } from "@/components/AppBar";
import { DarkButton } from "@/components/buttons/DrakButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { LinkButton } from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";

interface zap{
	"id":string
	"triggerId":string
	"userId":number
	"actions":{
		"id":string
		"zapId":string
		"actionId":string
		"sortingOrder":number
		"type":{
			"id":string
			"name":string
		}
		}[],
		"trigger":{
		"id":string
		"zapId":string
		"triggerId":string
		"type":{
			"id":string
			"name":string
		}
	}
}

function useZaps(){
	const [loading,setLoading]=useState(true)
	const [zaps,setZaps]=useState<zap[]>([])
	useEffect(()=>{
		axios.get(`${BACKEND_URL}/api/v1/zap`,{
			headers:{
				"Authorization":localStorage.getItem("token")
			}
		})
		.then(res=>{
			setZaps(res.data.Zaps)
			setLoading(false)
		})
	})
	return {
		loading,zaps
	}
}
export default function(){
  const router = useRouter();
	const {loading,zaps}=useZaps()
	return <div>
		<AppBar/>
		<div className="flex justify-center pt-8">
			<div className=" max-w-screen-lg w-full">
			<div className=" flex justify-between pr-8">
			<div className="text-2xl font-bold ">
				My Zaps
			</div>
			<DarkButton onClick={()=>{
				router.push("/zaps/create")
			}}>create</DarkButton>
		</div>
		</div>
		</div>
		{loading ? "loading..." : <ZapTable zaps={zaps}/>}
	</div>
}
function ZapTable({ zaps }: { zaps: zap[] }) {
  const router = useRouter();
	 if (!Array.isArray(zaps)) return <div>No zaps found</div>;
  return (
    <div>
      <div className="flex font-bold border-b pb-2 mb-2">
        <div className="flex-1">Name</div>
        <div className="flex-1">Last Edit</div>
        <div className="flex-1">Running</div>
        <div className="flex-1">Go</div>
      </div>

      {zaps.map((z) => (
  <div key={z.id} className="flex border-b py-2 items-center">
    <div className="flex-1">
      {(z.trigger?.type?.name || "Unknown Trigger") + " → "}

      {(z.actions?.length
        ? z.actions
            ?.map((x) => x?.type?.name || "Unknown Action")
            .join(", ")
        : "No Actions")}
    </div>

    <div className="flex-1">{z.id}</div>

    <div className="flex-1">NOV - 11 - 2025</div>

    <div className="flex-1">
      <LinkButton onClick={() => router.push("/zaps/" + z.id)}>
        Go
      </LinkButton>
    </div>
  </div>
))}

    </div>
  );
}
