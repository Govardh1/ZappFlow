import express from "express"
import { PrismaClient } from "@prisma/client"
import { Kafka } from "kafkajs"
import { setTimeout as wait } from "timers/promises"

const client = new PrismaClient()
const TOPIC_NAME = "zap-events"

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
})

async function main() {
  const producer = kafka.producer()
  await producer.connect()

  while (true) {
    try {
      const pendingRows = await client.zapRunOutBox.findMany({
        where: {},
        take: 10,
      })

      if (pendingRows.length === 0) {
        await wait(1000)
        continue
      }

      await producer.send({
        topic: TOPIC_NAME,
        messages: pendingRows.map((r) => ({
          value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 }),
        })),
      })

      await client.zapRunOutBox.deleteMany({
        where: { id: { in: pendingRows.map((r) => r.id) } },
      })
    } catch (error) {
      console.error("Error while processing outbox:", error)
      await wait(2000)
    }
  }
}

main()
