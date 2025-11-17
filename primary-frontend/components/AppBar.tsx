"use client"
import { useRouter } from "next/navigation"
import { LinkButton } from "./buttons/LinkButton"
import { PrimaryButton } from "./buttons/PrimaryButton"

export const AppBar = () => {
	const router = useRouter()
	return <div className="flex border border-slate-100 justify-between p-4">
		<div className="flex flex-col justify-center text-2xl font-extrabold">
			zapier
		</div>
		<div className="flex">
			<div className="pr-4">
				<LinkButton onClick={() => { }}>contact sales</LinkButton>
			</div>
			<div className="pr-4">
				<LinkButton onClick={() => {
					router.push("/login")
				}}>Login</LinkButton>
			</div>
			<div className="pr-4">
				<PrimaryButton onClick={() => {
					router.push("/signup")
				}}>
					signUp
				</PrimaryButton>
			</div>
		</div>
	</div>
}