import express from "express";
import { sendMessage, getMessages, getConversations } from "../controller/message.js";

const router = express.Router();

router.post("/", sendMessage);
router.get("/", getMessages);
router.get("/", getConversations);


export default router;
