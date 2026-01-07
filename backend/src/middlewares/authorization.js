import jwt from "jsonwebtoken";
import client from "../connection/pgdb.js"

export default async function authorization(req, res, next) {
    const token = req.cookies.jwt;

    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);

    const userId = jwtPayload.userId

    if (!userId) {
        res.status(409).send({
            message: "Invalid Token"
        })
    }

    const foundUser = await client.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (!foundUser) {
        res.status(404).send({
            message: "User not found"
        })
    }

    req.userId = userId;
    next();
}