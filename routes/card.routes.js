import express from "express";
import {
  createCard,
  getCard,
  editCard,
  removeCard,
  getCardDetails,
} from "../controllers/vCardControllers.js";

const router = express.Router();

router.get("/", getCard);
router.post("/", createCard);
router.get("/:id", getCardDetails);
router.patch("/:id", editCard);
router.delete("/:id", removeCard);

export default router;
