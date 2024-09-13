const { NotFoundError, BadRequestError } = require("../middlewares/errors");
const Card = require("../models/card");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { title, link, owner } = req.body;
  Card.create({ title, link, owner })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      return new BadRequestError(
        "Se pasaron datos inválidos a los métodos para crear una tarjeta."
      );
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ninguna tarjeta con esa id");
    })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ninguna tarjeta con esa id");
    })
    .then(() => res.send({ message: "Like existoso" }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ninguna tarjeta con esa id");
    })
    .then(() => res.send({ message: "dislike existoso" }))
    .catch(next);
};
