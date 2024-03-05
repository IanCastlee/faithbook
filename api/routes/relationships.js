import express from "express";
import {
  getRelationships,
  addRelationships,
  delRelationship,
  getFollowerLength
  
} from "../controller/relationship.js";
const router = express.Router();

router.get("/", getRelationships);
router.post("/", addRelationships);
router.delete("/", delRelationship);
router.get("/length",getFollowerLength)

export default router;
