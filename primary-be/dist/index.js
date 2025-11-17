import express from "express";
import { userRouter } from "./routes/user.js";
import { zapRouter } from "./routes/zap.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);
app.listen(3002, () => console.log("Server running on 3002"));
//# sourceMappingURL=index.js.map