import express from "express";
import dotenv from "dotenv";
import logger from "./src/middlewares/logger.js"
import authRouter from "./src/routes.js/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
    res.send("Hello World");
})
app.use("/auth", authRouter);

app.use((err, req, res, next) => {
    console.error(err);
})

export default app;