"use client"
import { BACKEND_URL } from "@/app/config";
import { AppBar } from "@/components/AppBar";
import { LinkButton } from "@/components/buttons/LinkButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/Input";
import { ZapCell } from "@/components/ZapCell";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useAvailableActionsandTriggers() {
	const [availableActions, setAvailableActions] = useState([])
	const [availableTriggers, setAvailableTriggers] = useState([])
	useEffect(() => {
		axios.get(`${BACKEND_URL}/api/v1/trigger/available`).then(x => setAvailableTriggers(x.data.availableTriggers))
		axios.get(`${BACKEND_URL}/api/v1/action/available`).then(x => setAvailableActions(x.data.availableActions))
	}, [])
	return {
		availableActions, availableTriggers
	}
}
export default function () {
	const router = useRouter()
	const { availableActions, availableTriggers } = useAvailableActionsandTriggers();
	const [selectedTrigger, setSelectedTrigger] = useState<{
		id: string
		name: string
	}>();
	const [selectedAction, setSelectedAction] = useState<{
		index: number
		availableActionId: string
		availableActionName: string
		metadata:any
	}[]>([]);
	const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null)
	return <div>
		<AppBar />
		<div className="flex justify-end bg-slate-200 p-8">
			<PrimaryButton onClick={async () => {
				if (!selectedTrigger?.id) {
					alert("Please select a trigger");
					return;
				}

				// const validActions = selectedAction.filter(a => a.availableActionId);

				// if (validActions.length === 0) {
				// 	alert("Please add at least one action");
				// 	return;
				// }

				const res = await axios.post(`${BACKEND_URL}/api/v1/zap`, {
					"availableTriggerId": selectedTrigger.id,
					"triggerMetaData": {},
					"actions": selectedAction.map(a => ({
						availableActionId: a.availableActionId,
						actionMetaData: a.metadata
					}))
				}, {
					headers: {
						Authorization: localStorage.getItem("token")
					}
				})
				router.push("/dashboard")
			}}>Publish</PrimaryButton>
		</div>
		<div className="w-full h-screen bg-slate-200 flex flex-col items-center justify-center ">
			<div className="flex justify-center">
				<ZapCell onClick={() => {
					setSelectedModalIndex(1)

				}} name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"} index={1}></ZapCell>
			</div>
			<div className=" w-full pt-2 pb-2" >
				{selectedAction.map(
					(action, index) =>
						<div key={index} className="flex justify-center pb-2">
						<ZapCell onClick={() => {
							setSelectedModalIndex(action.index)	
							// {<Modal availableItems={selectedModalIndex===1 ? availableTriggers || availableActions} onSelect={"name"} index={1}/>}
						}} name={action.availableActionName ? action.availableActionName : "Action"} index={action.index}>
						</ZapCell>
						</div>)}
			</div>

			<PrimaryButton onClick={() => {
				setSelectedAction(a => [...a, {
					index: a.length + 2, availableActionId: "", availableActionName: "",metadata:{}
				}
				])
			}}><div className="text-2xl flex flex-col items-center justify-center"> + </div>
			</PrimaryButton>
		</div>
		{selectedModalIndex && <Modal availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions} onSelect={(props: null | { name: string, id: string ,metadata:any}) => {
			if (props === null) {
				setSelectedModalIndex(null)
				return
			}
			if (selectedModalIndex === 1) {
				setSelectedTrigger({
					id: props.id,
					name: props.name
				})
			} else {
				setSelectedAction(a => {
					let newActions = [...a]
					newActions[selectedModalIndex - 2] = {
						index: selectedModalIndex,
						availableActionId: props.id,
						availableActionName: props.name,
						metadata:props.metadata
					}
					return newActions
				})
			}
			setSelectedModalIndex(null)
		}} index={selectedModalIndex} />}
	</div>
}

function Modal({ index, onSelect, availableItems }: { index: number, onSelect: (props: null | { name: string, id: string,metadata:any }) => void, availableItems: { id: string, name: string, image: string }[] }) {
	const [step,setStep]=useState(0)
	const [selectedAction,setSelectedAction]=useState<{
		id:string,
		name:string
	}>()

	const isTrigger= index===1;
	
	return <div id="static-modal" data-modal-backdrop="static" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] bg-slate-100 bg-opacity-70 max-h-full">
		<div className="relative p-4 w-full max-w-2xl max-h-full">

			<div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">

				<div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
					<div className="text-2xl">
						select {index === 1 ? "Trigger" : "Action"}
					</div>
					<button onClick={() => {
						onSelect(null)
					}} type="button" className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="static-modal">
						<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" /></svg>
						<span className=" cursor-pointer sr-only">close Modal</span>
					</button>
				</div>
				<div className="p-4 md-p-5 space-y-4">
					{step===1 && selectedAction?.id==="email" && <EmailSelector setMetadata={(metadata) => {
		onSelect({
			...selectedAction,
			metadata
		})
	}}/>}
						
					{(step===1 && selectedAction?.id==="send-sol") && <SolanaSelector setMetadata={(metadata) => {
		onSelect({
			...selectedAction,
			metadata
		})
	}}/>}
					{step ===0 && <div>
						{availableItems.map(({ id, name, image }) => {
						return (<div key={id} onClick={() =>{ 
								if (isTrigger){
									onSelect({ 
										id,
										name,
										metadata:{}
									 }	
								)
								}else{
									setStep(s=>s+1)
									setSelectedAction({
										id,
										name
									})
								}
							}
						}
							className="flex border p-4 hover:bg-slate-200 cursor-pointer"
							>
							<img src={image} className="rounded h-[30px] pr-2" />
							<div className="flex flex-col justify-center">{name}</div>
							</div>
						);
						})}
						</div>}
				
					
				</div>
			</div>
		</div>
	</div>
}

function EmailSelector({setMetadata}:{setMetadata:(params:any)=>void}){
	const [email,setEmail]=useState("")
	const [body,setBody]=useState("")
	return <div>
	<Input type="text" label="To" placeholder="To" onChange={(e)=>{
		setEmail(e.target.value)
	}}></Input>
	<Input type="text" label="Body" placeholder="Body" onChange={(e)=>{
		setEmail(e.target.value)
	}}></Input>
	<PrimaryButton onClick={()=>{
		setMetadata({
			email,
			body
		})
	}} >Submit</PrimaryButton>
	</div>
}
function SolanaSelector({setMetadata}:{setMetadata:(params:any)=>void}){
	const [amount,setAmount]=useState("")
	const [address,setAdress]=useState("")
	return 	<div>
	<Input type="text" label="amount" placeholder="amount" onChange={(e)=>{
		setAmount(e.target.value)
	}}></Input>
	<Input type="text" label="address" placeholder="address" onChange={(e)=>{
		setAdress(e.target.value)
	}}></Input>
	<PrimaryButton onClick={()=>{
		setMetadata({
			amount,address
		})
	}} >Submit</PrimaryButton>
	</div>
}