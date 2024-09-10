const router = require("express").Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");


const { celebrate } = require("celebrate");
const { cardCreateValidator } = require("../models/validation");

router.get("/", getCards);
router.post("/", celebrate({ body: cardCreateValidator }), createCard);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
