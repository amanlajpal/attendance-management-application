import express from "express";
import client from "../connection/pgdb.js"

const attendeeRouter = express.Router();

attendeeRouter.post("/createAttendee", async (req, res, next) => {
    const { name } = req.body;

    const createdAttendee = (await client.query("INSERT INTO attendees (name) VALUES ($1) RETURNING *", [name])).rows[0];

    res.status(201).send({
        message: "Attendee created successfully",
        data: createdAttendee
    })
})

attendeeRouter.put("/updateAttendee", async (req, res, next) => {
    const { attendeeName } = req.body;

    const createdAttendee = await client.query("INSERT INTO attendees (name) VALUES ($1) RETURNING *", [attendeeName]);

    res.status(201).send({
        message: "Attendee created successfully",
        data: createdAttendee
    })
})



export default attendeeRouter;