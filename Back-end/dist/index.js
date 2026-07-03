import express from "express";
import cors from "cors";
import linkRoutes from "./routes/link.routes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", linkRoutes);
export default app;
//# sourceMappingURL=index.js.map