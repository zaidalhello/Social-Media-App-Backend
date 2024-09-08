import express from "express";
import { createChat, findChats, userChats } from "../controller/ChatControllor.js";

const ChatRoute = express.Router();

ChatRoute.post("/",createChat)
ChatRoute.get("/:userId",userChats)
ChatRoute.get("/find/:firstID/:secondID",findChats)

export default ChatRoute;
