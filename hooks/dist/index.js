import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const client = new PrismaClient();
app.use(express.json());
app.post("/hooks/catch/:userID/:zapId", async (req, res) => {
    const userID = req.params.userID;
    const zapId = req.params.zapId;
    const body = req.body;
    try {
        await client.$transaction(async (tx) => {
            const run = await tx.zapRun.create({
                data: {
                    zapId: zapId,
                    metadata: body
                }
            });
            await tx.zapRunOutBox.create({
                data: {
                    zapRunId: run.id,
                }
            });
        });
        res.json({
            msg: "Webhook received successfully"
        });
    }
    catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).json({
            error: "Failed to process webhook"
        });
    }
});
app.listen(3000, () => {
    console.log("Webhook server listening on port 3000");
});
//# sourceMappingURL=index.js.map