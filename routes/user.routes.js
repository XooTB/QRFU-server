import express from "express";
import { createUser, getUser } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", getUser);
router.post("/", createUser);

export default router;
