import express from "express";
import client from "../connection/pgdb.js"

const attendeeRouter = express.Router();

attendeeRouter.post("/create", async (req, res, next) => {
    const { name } = req.body;

    const createdAttendee = (await client.query("INSERT INTO attendees (name) VALUES ($1) RETURNING *", [name])).rows[0];

    res.status(201).send({
        message: "Attendee created successfully",
        data: createdAttendee
    })
})

attendeeRouter.put("/update", async (req, res, next) => {
    const { id, name } = req.body;

    if (!id || !name) {
        res.status(404).send({
            message: "Please send both Attendee name and id"
        })
    }

    const updatedAttendee = (await client.query("UPDATE attendees SET name = $1 WHERE id = $2 RETURNING *", [name, id])).rows[0];

    res.status(201).send({
        message: "Attendee updated successfully",
        data: updatedAttendee
    })
})

attendeeRouter.delete("/:id", async (req, res, next) => {

    const attendeeId = req.params.id

    const deletedAttendees = (await client.query(`
        UPDATE attendees
        SET deleted_at = NOW()
        WHERE id = $1 RETURNING *;
    `, [attendeeId])).rows;

    if (deletedAttendees.length > 0) {
        res.status(200).send({
            message: "Attendee deleted successfully",
        })
    } else {
        res.status(404).send({
            message: "Attendee not found"
        })
    }
})


export default attendeeRouter;