import client from "../connection/pgdb.js";

client.query(`
        CREATE EXTENSION IF NOT EXISTS CITEXT;
    `)

client.query(`
        CREATE TABLE IF NOT EXISTS users
        (
            id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            email CITEXT UNIQUE NOT NULL
            password VARCHAR UNIQUE NOT NULL,
        );
    `)