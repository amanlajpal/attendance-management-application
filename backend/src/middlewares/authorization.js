import jwt from "jsonwebtoken";
import client from "../connection/pgdb.js"

export default async function authorization(req, res, next) {
    const token = req.cookies.jwt;

    if(!token){
        return res.status(400).send({
            data: null,
            message: "Please provide Auth Token"
        })
    }

    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);

    const userId = jwtPayload.userId

    if (!userId) {
        return res.status(409).send({
            data: null,
            message: "Invalid Token"
        })
    }

    const foundUser = await client.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (!foundUser) {
        return res.status(404).send({
            data: null,
            message: "User not found"
        })
    }

    req.userId = userId;
    next();
}