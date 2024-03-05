import express from "express";
import { userPosts } from "../controller/userPost.js";

const router = express.Router();

router.get("/", userPosts);

export default router;
