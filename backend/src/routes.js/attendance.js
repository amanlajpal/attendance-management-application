import express from "express";
import client from "../connection/pgdb.js"

const attendanceRouter = express.Router();

attendanceRouter.post("/create", async (req, res, next) => {
    const { attendee_id, attendance, date } = req.body;
    let { comment } = req.body;

    if (!attendee_id || !attendance || !date) {
        res.status(404).send({
            message: "Date, Attendee Id and attendance all are mandatory!"
        })
    }

    if (comment == "") {
        comment = null;
    }

    const foundAttendee = (await client.query("SELECT * FROM attendees WHERE id = $1;", [attendee_id])).rows[0]

    if (!foundAttendee) {
        res.status(404).send({
            message: "Attendee not found!"
        })
    }

    const attendanceFound = (await client.query("SELECT * FROM attendance WHERE attendee_id = $1 AND date_trunc('day', created_at) = $2;", [attendee_id, date]))?.rows?.[0];

    if (attendanceFound) {
        res.status(409).send({
            message: "Attendance already created",
            data: attendanceFound
        })
    } else {
        const createdAttendance = (await client.query("INSERT INTO attendance (attendee_id, attendance, comment, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *", [attendee_id, attendance, comment, date, date])).rows[0];

        res.status(201).send({
            message: "Attendance marked successfully",
            data: createdAttendance
        })
    }
})

attendanceRouter.put("/update", async (req, res, next) => {

    const { attendance, attendance_id } = req.body;
    let { comment } = req.body;

    if (!attendance && !attendance_id) {
        res.status(404).send({
            message: "Date, Attendee Id and attendance all are mandatory!"
        })
    }

    if (comment == "") {
        comment = null;
    }

    const attendanceFound = (await client.query("SELECT * FROM attendance WHERE  id = $1;", [attendance_id]))?.rows?.[0];

    if (attendanceFound) {
        const updatedAttendance = (await client.query("UPDATE attendance SET attendance = $1, comment = $2, updated_at = NOW() WHERE id = $3 RETURNING *;", [attendance, comment, attendanceFound.id])).rows[0];

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
    let { page, pageSize, date } = req.query;

    page = page ? +page : 0;

    const limit = pageSize || 10;
    const offset = page * limit;

    const getAttendanceQuery = `
    SELECT 
        attendance.id,
        attendees.name AS attendee_name,
        attendees.id AS attendee_id,
        attendance.attendance,
        attendance.comment,
        attendance.created_at,
        attendance.updated_at,
        attendance.deleted_at
    FROM attendees 
    LEFT JOIN attendance 
        ON attendees.id = attendance.attendee_id 
            AND 
                ${date
            ? `date_trunc('day', attendance.created_at) = '${date}'`
            : "date_trunc('day', attendance.created_at) = CURRENT_DATE"
        }
    WHERE attendees.deleted_at IS NULL
    ORDER BY attendees.id`;

    const totalRowsCount = (await client.query(`
            SELECT COUNT(*)
            FROM 
            (
                ${getAttendanceQuery}
            ) AS sq;
        `)).rows[0].count

    const attendance = (await client.query(`
        ${getAttendanceQuery}
        LIMIT $1 OFFSET $2;
    `, [limit, offset]))?.rows;

    res.status(200).send({
        message: "Attendance loaded successfully",
        data: {
            rows: attendance,
            page: page,
            totalRowsCount: +totalRowsCount
        }
    })
})


export default attendanceRouter;