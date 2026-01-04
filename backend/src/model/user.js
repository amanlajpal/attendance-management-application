import client from "../connection/pgdb.js";

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
}

createUserAndRelatedExtension()
    .then(() => {
        console.log("Table and extension created successfully");
    }).catch((err) => {
        console.error(err);
    }).finally(async () => {
        await client.end();
    })

