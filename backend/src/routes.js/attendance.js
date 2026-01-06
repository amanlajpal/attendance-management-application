import express from "express";
import client from "../connection/pgdb.js"

const attendanceRouter = express.Router();

attendanceRouter.post("/create", async (req, res, next) => {
    const { attendee_id, attendance, comment } = req.body;

    if (!attendee_id || !attendance) {
        res.status(404).send({
            message: "Attendee Id and attendance both are mandatory!"
        })
    }

    const attendanceFound = (await client.query("SELECT * FROM attendance WHERE date_trunc('day', created_at) = CURRENT_DATE;"))?.rows?.[0];

    if (attendanceFound) {
        res.status(409).send({
            message: "Attendance already created",
            data: attendanceFound
        })
    } else {
        const createdAttendance = (await client.query("INSERT INTO attendance (attendee_id, attendance, comment) VALUES ($1, $2, $3) RETURNING *", [attendee_id, attendance, comment])).rows[0];

        res.status(201).send({
            message: "Attendee created successfully",
            data: createdAttendance
        })
    }
})



export default attendanceRouter;