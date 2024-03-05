import express from "express";
import { getAllVerse, delVerse } from "../controller/allVerse.js";

const router = express.Router();

router.get("/", getAllVerse);
router.delete("/:id", delVerse);

export default router;
