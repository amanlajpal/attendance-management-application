import express from "express";
import bcrypt from "bcryptjs";
import client from "../connection/pgdb.js";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(404).send({
                message: "All fields are mandatory"
            })
        }

        const foundUsers = (await client.query("SELECT * FROM users WHERE email = $1", [email])).rows;

        if (foundUsers.length > 0) {
            res.status(409).send({
                message: "User already registered"
            })
        }

        const hashedPassword = await bcrypt.hash(password, +process.env.SALT);

        const createdUser = (await client.query("INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *", [name, email, hashedPassword])).rows[0];

        res.status(201).send({
            message: "User registered successfully",
            user: createdUser
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(404).send({
                message: "All fields are mandatory"
            })
        }

        const foundUser = (await client.query("SELECT * FROM users WHERE email = $1;", [email])).rows[0];

        if (!foundUser) {
            res.status(404).send({
                message: "Invalid Credentials"
            })
        }

        const isSame = await bcrypt.compare(password, foundUser.password);

        if (!isSame) {
            res.status(404).send({
                message: "Invalid Credentials"
            })
        }

        const token = jwt.sign({ userId: foundUser.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("jwt", token, { httpOnly: true });
        res.status(200).send({
            message: "Logged in successfully!",
            token
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal Server Error",
        })
    }
})

export default authRouter;