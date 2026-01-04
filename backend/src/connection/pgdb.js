import { Client } from "pg";

const client = new Client({
    database: "attendance",
    user: "postgres",
    password: process.env.PGDB_Password,
    host: "localhost",
    port: 5432,
});

client.connect()
    .then(() => {
        console.log("Database connected successfully")
    })
    .catch((err) => {
        console.error("Error while connecting to pgdb: ", err);
    })

export default client;