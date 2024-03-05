import express from "express";
import { getUser, updateCover, updateProfile, userInfoUpdate } from "../controller/user.js";

const router = express.Router();

router.get("/find/:userId", getUser )
router.put("/cover", updateCover)
router.put("/profile", updateProfile)
router.put("/", userInfoUpdate)


export default router;
