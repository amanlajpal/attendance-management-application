import express from "express";
import bcrypt from "bcryptjs";
import client from "../connection/pgdb.js";
import jwt from "jsonwebtoken";
import authorization from "../middlewares/authorization.js";

const isProd = process.env.NODE_ENV === "production";
const cookieOptions = {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
    maxAge: 60 * 60 * 24 * 1000,
    path: "/",
};

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
            data: createdUser
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

        res.cookie("jwt", token, cookieOptions);

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

authRouter.use(authorization);

authRouter.post("/logout", async (req, res) => {
    res.clearCookie("jwt", { ...cookieOptions });
    res.status(200).send({
        message: "User logged out successfully"
    })
})

authRouter.get("/profile", async (req, res) => {
    const userId = req.userId;
    const foundUser = (await client.query(`SELECT id, name, email FROM users WHERE id = $1`, [userId])).rows[0];

    res.status(200).send({
        message: "User profile fetched successfully",
        data: foundUser
    })
})



export default authRouter;