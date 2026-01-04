import express from "express";

const authRouter = express.Router();

authRouter.get("/login", (req, res) => {
    res.send("Logged In");
});


export default authRouter;