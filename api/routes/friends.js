import express from "express";
import { getFr, acceptFr, deleteFr, getAllFriends, getSuggestion, deleteFrMain } from "../controller/friend.js";

const router = express.Router();

router.get("/", getFr);
router.post("/", acceptFr);
router.delete("/", deleteFr);
router.get("/friends", getAllFriends)
router.get("/suggestion", getSuggestion)
router.delete("/delFriend", deleteFrMain);


export default router;
