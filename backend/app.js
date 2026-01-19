import express from "express";
import cors from "cors";
import logger from "./src/middlewares/logger.js"
import authRouter from "./src/routes.js/authRoutes.js";
import attendeeRouter from "./src/routes.js/attendee.js"
import attendanceRouter from "./src/routes.js/attendance.js"
import authorization from "./src/middlewares/authorization.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.ALLOWED_ORIGIN, // Allow only a specific origin
    credentials: true,            // Enable cookies and credentials
}))

app.use(express.json());

app.use(cookieParser())

app.use(logger);

app.use("/auth", authRouter);

app.use(authorization);

app.use("/attendee", attendeeRouter);

app.use("/attendance", attendanceRouter);

app.use((err, req, res, next) => {
    console.log("error handler")
    console.dir(err);

    res.status(500).send({
        message: "Internal Server Error",
    })
})

export default app;