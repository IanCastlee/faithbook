import express from "express";
import { getPosts, addPost, delPost } from "../controller/post.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.delete("/:id", delPost);

export default router;
