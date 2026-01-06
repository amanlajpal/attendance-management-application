import express from "express";
import client from "../connection/pgdb.js"

const attendanceRouter = express.Router();

attendanceRouter.post("/create", async (req, res, next) => {
    const { attendee_id, attendance } = req.body;
    let { comment } = req.body;

    if (!attendee_id || !attendance) {
        res.status(404).send({
            message: "Attendee Id and attendance both are mandatory!"
        })
    }

    if (comment == "") {
        comment = null;
    }

    const attendanceFound = (await client.query("SELECT * FROM attendance WHERE attendee_id = $1 AND date_trunc('day', created_at) = CURRENT_DATE;", [attendee_id]))?.rows?.[0];

    if (attendanceFound) {
        res.status(409).send({
            message: "Attendance already created",
            data: attendanceFound
        })
    } else {
        const createdAttendance = (await client.query("INSERT INTO attendance (attendee_id, attendance, comment) VALUES ($1, $2, $3) RETURNING *", [attendee_id, attendance, comment])).rows[0];

        res.status(201).send({
            message: "Attendance created successfully",
            data: createdAttendance
        })
    }
})

attendanceRouter.put("/update", async (req, res, next) => {

    const { attendee_id, attendance } = req.body;
    let { comment } = req.body;

    if (!attendee_id || !attendance) {
        res.status(404).send({
            message: "Attendee Id and attendance both are mandatory!"
        })
    }

    if (comment == "") {
        comment = null;
    }

    const attendanceFound = (await client.query("SELECT * FROM attendance WHERE  attendee_id = $1 AND date_trunc('day', created_at) = CURRENT_DATE;", [attendee_id]))?.rows?.[0];

    if (attendanceFound) {
        const updatedAttendance = (await client.query("UPDATE attendance SET attendee_id = $1, attendance = $2, comment = $3, updated_at = NOW() WHERE id = $4 RETURNING *;", [attendee_id, attendance, comment, attendanceFound.id])).rows[0];

        res.status(200).send({
            message: "Attendance updated successfully",
            data: updatedAttendance
        })
    } else {
        res.status(404).send({
            message: "Attendance not found",
        })
    }
})

attendanceRouter.get("/", async (req, res, next) => {

    const attendance = (await client.query(`
        SELECT 
            attendance.id,
            attendees.name AS attendee_name,
            attendees.id AS attendee_id,
            attendance.attendance,
            attendance.comment,
            attendance.created_at,
            attendance.updated_at,
            attendance.deleted_at
        FROM attendance 
        LEFT JOIN attendees ON attendees.id = attendance.attendee_id 
        WHERE date_trunc('day', attendance.created_at) = CURRENT_DATE;
    `))?.rows;

    res.status(200).send({
        message: "Attendance updated successfully",
        data: attendance
    })
})

attendanceRouter.delete("/:id", async (req, res, next) => {

    const attendanceId = req.params.id

    const deletedAttendance = (await client.query(`
        UPDATE attendance
        SET deleted_at = NOW()
        WHERE id = $1;
    `, [attendanceId]))?.rows;

    res.status(200).send({
        message: "Attendance deleted successfully",
    })
})



export default attendanceRouter;