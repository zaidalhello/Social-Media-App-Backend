import express from "express";
import { addMessage, getMessage } from "../controller/MessageControllor.js";

const MessageRoute = express.Router();

MessageRoute.post("/",addMessage)
MessageRoute.get("/:chatId",getMessage)

export default MessageRoute;
