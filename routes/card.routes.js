import express from "express";
import {
  createCard,
  getCard,
  editCard,
  removeCard,
} from "../controllers/vCardControllers.js";

const router = express.Router();

router.get("/", getCard);
router.post("/", createCard);
router.patch("/:id", editCard);
router.delete(":/id", removeCard);

export default router;
