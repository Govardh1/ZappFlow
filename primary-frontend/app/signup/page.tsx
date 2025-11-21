"use client"
import { AppBar } from "@/components/AppBar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function () {
	const router=useRouter()
	const [Name, setName] = useState("")
	const [Email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	return (
		<div className="min-h-screen bg-gray-50">
			<AppBar />

			<div className="flex justify-center pt-16 px-4">
				<div className="flex max-w-6xl w-full gap-16">
					<div className="flex-1 flex flex-col justify-center px-4">
						<div className="font-semibold text-4xl leading-snug pb-6">
							AI Automation starts and scales with Zapier
						</div>

						<div className="space-y-4 pt-4">
							<CheckFeature label="Integrate 8,000+ apps and 300+ AI tools without code" />
							<CheckFeature label="Build AI-powered workflows in minutes, not weeks" />
							<CheckFeature label="14-day trial of all premium features and apps" />
						</div>
					</div>

					<div className="flex-1">
						<div className="border border-slate-100 bg-white rounded-2xl shadow-lg px-6 py-8 space-y-4 mt-4">
							<Input
								label="Name"
								onChange={(e) => {
									setName(e.target.value)
								}}
								type="text"
								placeholder="Your Name"
							/>

							<Input
								label="Email"
								onChange={(e) => {
									setEmail(e.target.value)
								}}
								type="text"
								placeholder="Your Email"
							/>

							<Input
								label="Password"
								onChange={(e) => {
									setPassword(e.target.value)
								}}
								type="password"
								placeholder="Password"
							/>

							<div className="pt-4 text-center">
								<PrimaryButton
									onClick={async() => {
									const res=await	axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
											email:Email,
											password:password,
											name:Name
										})
										router.push("/login")
									 }}
									size="big"
								>
									Get Started
								</PrimaryButton>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}
