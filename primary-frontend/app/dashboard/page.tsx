"use client"
import { AppBar } from "@/components/AppBar";
import { DarkButton } from "../../components/buttons/DrakButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOK_URL } from "../config";
import { LinkButton } from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";

interface Zap {
  id: number;
  triggerId: number;
  userId: number;
  actions: {
    id: number;
    zapId: number;
    actionId: number;
    sortingOrder: number;
    type: {
      id: number;
      name: string;
	  image:string
    };
  }[];
  trigger: {
    id: number;
    zapId: number;
    triggerId: number;
    type: {
      id: number;
      name: string;
	  image:string
    };
  };
}

function useZaps(){
	const [loading, setLoading] = useState(true);
	const [zaps, setZaps] = useState<Zap[]>([]);

	useEffect(() => {
		const token =localStorage.getItem("token") ;

		axios.get(`${BACKEND_URL}/api/v1/zap`, {
			headers: {
				Authorization: token,
			},
		}).then(res => {
			console.log("API Response:", res.data);
			setZaps(res.data.zaps);
			setLoading(false);
		}).catch(err => {
			console.error("API Error:", err);
			setLoading(false);
		});
	}, []);

	return {
		loading,
		zaps
	};
}

export default function(){
	const router = useRouter();
	const { loading, zaps } = useZaps();

	return <div>
		<AppBar/>
		<div className="flex justify-center pt-8">
			<div className="max-w-screen-lg w-full">
				<div className="flex justify-between pr-8">
					<div className="text-2xl font-bold">
						My Zaps
					</div>
					<DarkButton onClick={() => {
						router.push("/zaps/create");
					}}>create</DarkButton>
				</div>
			</div>
		</div>
		{loading ? "loading..." : <ZapTable zaps={zaps}/>}
	</div>;
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
	const router = useRouter();

	if (zaps.length === 0) {
		return <div className="flex justify-center pt-8">No zaps found</div>;
	}

	return (
		<div className="flex justify-center pt-8">
			<div className="max-w-screen-lg w-full pr-8">
				<div className="flex font-bold border-b pb-2 mb-2">
					<div className="flex-1">Name</div>
					<div className="flex-1">id</div>
					<div className="flex-1">Last Edit</div>
					<div className="flex-1">WEBHOOK-URL</div>
					<div className="flex-1">Go</div>
				</div>

				{zaps.map((z) => {
					return (
						<div key={z.id} className="flex border-b py-2 items-center">
							<div className="flex-1">
								<img src={z.trigger.type.image} className="w-6 h-6 inline-block"/>{" --> "}
								{z.actions.map((x,i) => (<img key={i}
          							  src={x.type.image} className="w-6 h-6 inline-block"/> ))}
							</div>
							<div className="flex-1">{z.id}</div>
							<div className="flex-1">{"nov-24-2025"}</div>
							<div className="flex-1">{`${HOOK_URL}/hooks/catch/1/${z.id}`}</div>
							<div className="flex-1">
								<LinkButton onClick={() => router.push("/zaps/" + z.id)}>
									Go
								</LinkButton>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}