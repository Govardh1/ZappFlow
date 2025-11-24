import { Router } from "express";
import { authMiddleware } from "../middleware.js";
import { zapCreateSchema } from "../types/inde.js";
import prisma from "../lib/prisma.js";
const router = Router()


router.post("/", authMiddleware, async (req, res) => {
	const body = req.body
	// @ts-ignore
	const id = req.id;

	const parsedData = zapCreateSchema.safeParse(body)
	if (!parsedData.success) {
		return res.status(404).json({ msg: "invalid inputs" })
	}

	const zapId= prisma.$transaction(async (tx) => {
		const newZap = await tx.zap.create({
			data: {
				userId: Number(id),
				triggerId: "",
				actions: {
					create: parsedData.data.actions.map((x, index) => ({
						actionId: x.availableActionId,
						sortingOrder: index,
						metedata:x.actionMetaData
					}))
				}
			}
		});

		const trigger = await tx.trigger.create({
			data: {
				triggerId: parsedData.data.availableTriggerId,
				zapId: newZap.id
			}
		});

		await tx.zap.update({
			where: {
				id: newZap.id
			},
			data: {
				triggerId: trigger.id
			}
		});
		return newZap.id
	})
	return res.json({
		zapId
	})
})


router.get("/", authMiddleware, async (req, res) => {
	// @ts-ignore
	const id = Number(req.id);
	const zaps = await prisma.zap.findMany({
		where: {
			userId: id
		},
		include: {
			actions: {
				include: {
					type: true
				}
			},
			trigger: {
				include: {
					type: true
				}
			}
		}
	})
	return res.json({
		zaps
	})
})

router.get("/:zapId", authMiddleware, async (req, res) => {
	// @ts-ignore
	const id = Number(req.id);
	const zapId = req.params.zapId;
	if (!zapId) {
		return res.status(400).json({
			error: "zapId is required"
		});
	}
	const zap = await prisma.zap.findFirst({
		where: {
			id: zapId,
			userId: id
		},
		include: {
			actions: {
				include: {
					type: true
				}
			},
			trigger: {
				include: {
					type: true
				}
			}
		}
	})
	if (!zap) {
		return res.status(404).json({
			error: "Zap not found"
		});
	}
	return res.json({
		zap
	})
})

export const zapRouter = router;