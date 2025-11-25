import { Kafka } from "kafkajs";
const TOPIC_NAME = "zap-events";
import { PrismaClient } from "@prisma/client";
import { parser } from "./parser.js";
const client = new PrismaClient();
const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
});
async function main() {
    const consumer = kafka.consumer({ groupId: 'main-worker' });
    await consumer.connect();
    const producer = kafka.producer();
    await producer.connect();
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: false });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString()
            });
            if (!message.value) {
                return;
            }
            const parsedValue = JSON.parse(message.value?.toString());
            const zapRunId = parsedValue.zapRunId;
            const stage = parsedValue.stage;
            const zapRunDetails = await client.zapRun.findFirst({
                where: {
                    id: zapRunId,
                }, include: {
                    zap: {
                        include: {
                            actions: {
                                include: {
                                    type: true
                                }
                            }
                        }
                    }
                }
            });
            const currentAction = zapRunDetails?.zap.actions.find(x => x.sortingOrder === stage);
            if (!currentAction) {
                console.log("current action not found");
                return;
            }
            const zapRunMeatadat = zapRunDetails?.metadata;
            if (currentAction.type.id === "email") {
                const body = parser(currentAction.metadata?.body, zapRunMeatadat);
                const to = parser(currentAction.metadata?.email, zapRunMeatadat);
                console.log(`sending out email to ${to} body is ${body}`);
            }
            if (currentAction.type.id === "send-sol") {
                const amount = parser(currentAction.metadata?.amount, zapRunMeatadat);
                const address = parser(currentAction.metadata?.address, zapRunMeatadat);
                console.log(`sending out amount to ${amount} to address is ${address}`);
            }
            await new Promise(r => setTimeout(r, 1000));
            const Laststage = (zapRunDetails?.zap.actions.length || 1) - 1;
            if (Laststage !== stage) {
                await producer.send({
                    topic: TOPIC_NAME,
                    messages: [{
                            value: JSON.stringify({
                                stage: stage + 1,
                                zapRunId
                            })
                        }]
                });
            }
            await consumer.commitOffsets([{
                    topic: TOPIC_NAME,
                    partition: partition,
                    offset: (parseInt(message.offset) + 1).toString(),
                }]);
        }
    });
}
main();
//# sourceMappingURL=index.js.map