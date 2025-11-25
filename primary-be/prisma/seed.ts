import {PrismaClient} from "@prisma/client"
const client=new PrismaClient();


async function main() {
	await client.availableTrigger.create({
		data:{
			id:"weebhook",
			name:"weebhook",
			image:"https://miro.medium.com/v2/resize:fit:1080/1*wQ2-ajH0d14dGfRHyVQVPQ.png"
		}
	})
	await client.availableAction.create({
		data:{
			id:"send-sol",
			name:"send Solana",
			image:"https://panoramacrypto.transfero.com/wp-content/uploads/2021/05/solana-ethereum.jpg"
		}
	})
	await client.availableAction.create({
		data:{
			id:"email",
			name:"send Emial",
			image:"https://th.bing.com/th/id/OIP.PMTXHvDUmx3pdx09IVmlfQHaHa?w=188&h=188&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
		}
	})
}

main()