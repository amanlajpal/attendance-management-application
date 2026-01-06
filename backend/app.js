import express from "express";
import dotenv from "dotenv";
import logger from "./src/middlewares/logger.js"
import authRouter from "./src/routes.js/authRoutes.js";
import attendanceRouter from "./src/routes.js/attendance.js"
import authorization from "./src/middlewares/authorization.js";

dotenv.config();

const app = express();

app.use(express.json());

// middlewares

app.use(logger);
app.use(authorization);

app.use("/auth", authRouter);
app.use("/attendance", attendanceRouter);

app.use((err, req, res, next) => {
    console.log("error handler")
    console.dir(err);
    
    res.status(500).send({
        message: "Internal Server Error",
    })
})

export default app;