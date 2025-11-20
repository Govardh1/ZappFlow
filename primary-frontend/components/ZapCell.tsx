export const ZapCell=({
	name,
	index
}:{
	name?:string;
	index:number
})=>{
	return <div className="border flex felx-col justify-center border-black py-8 px-8 flex w-[300px ] cursor-pointer">
		<div className="flex text-xl">
			<div className="font-bold">{index}. </div>
		<div>
			{name}
		</div> 
		</div>
	</div>
}