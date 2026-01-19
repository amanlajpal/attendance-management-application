import { Client } from "pg";

const connectionObj = process.env.NODE_ENV === "production" ? {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
} : {
    database: "attendance",
    user: "postgres",
    password: process.env.PGDB_Password,
    host: "localhost",
    port: 5432,
}

const client = new Client(connectionObj);

client.connect()
    .then(() => {
        console.log("Database connected successfully")
    })
    .catch((err) => {
        console.error("Error while connecting to pgdb: ", err);
    })

export default client;