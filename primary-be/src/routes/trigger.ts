import { PrismaClient } from "@prisma/client";
import { Router } from "express";
const client = new PrismaClient()

const router=Router()

router.get("/available", async (req, res) => {
  try {
    const availableTriggers = await client.availableTrigger.findMany();
    res.json({ availableTriggers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export  const triggerRouter=router