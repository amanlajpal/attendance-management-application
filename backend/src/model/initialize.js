import client from "../connection/pgdb.js";

console.log("Initializing PostgreSQL Db");

async function createUserAndRelatedExtension() {
    await client.query(`
            CREATE EXTENSION IF NOT EXISTS CITEXT;
        `)

    await client.query(`
            CREATE TABLE IF NOT EXISTS users
            (
                id SERIAL PRIMARY KEY,
                name VARCHAR NOT NULL,
                email CITEXT UNIQUE NOT NULL,
                password VARCHAR NOT NULL
            );
        `)

    await client.query(`
            CREATE TABLE IF NOT EXISTS attendees
            (
                id SERIAL PRIMARY KEY,
                name VARCHAR NOT NULL
            );
        `)


    // await client.query(`
    //         CREATE TYPE attendance_enum AS ENUM ('P', 'A');
    //     `)


    await client.query(`
            CREATE TABLE IF NOT EXISTS attendance
            (
                id SERIAL PRIMARY KEY,
                attendee_id INTEGER NOT NULL references attendees(id),
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                deleted_at TIMESTAMP,
                attendance attendance_enum NOT NULL,
                comment VARCHAR
            );
        `)
}

createUserAndRelatedExtension()
    .then(() => {
        console.log("Tables and extensions created successfully");
    }).catch((err) => {
        console.error(err);
    }).finally(async () => {
        await client.end();
    })


