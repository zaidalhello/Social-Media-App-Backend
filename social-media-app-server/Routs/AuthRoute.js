import express from "express";
import { registerUser,Login } from "../controller/AuthControllor.js";

const AuthRoute = express.Router();


AuthRoute.post("/RegisterNewUser", registerUser);
AuthRoute.post("/login", Login);

export default AuthRoute;
 