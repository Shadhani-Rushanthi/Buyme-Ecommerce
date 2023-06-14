import express from "express";
import { login, register } from "../controllers/auth.js";
import { verifyTokenForCheckLogin } from "../utils/verifyToken.js";

const route = express.Router()

route.post("/register", register)
route.get("/checkLogin/:email/:password", login)
route.get("/verifyToken", verifyTokenForCheckLogin)


export default route;