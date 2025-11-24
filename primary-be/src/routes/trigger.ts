import prisma from "../lib/prisma.js";
import { Router } from "express";


const router=Router()

router.get("/available", async (req, res) => {
  try {
    const availableTriggers = await prisma.availableTrigger.findMany();
    res.json({ availableTriggers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export  const triggerRouter=router