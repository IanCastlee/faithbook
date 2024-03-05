import express from "express";
import { getVerse, delVerse } from "../controller/userVerse.js";

const router = express.Router();

router.get("/", getVerse);
router.delete("/:id", delVerse);

export default router;
