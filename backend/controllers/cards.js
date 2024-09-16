const { NotFoundError, BadRequestError } = require("../middlewares/errors");
const Card = require("../models/card");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === "NotFoundError") {
        next(new NotFoundError("Tarjetas no encontradas"));
      } else {
        next(err);
      }
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ title: name, link, owner: req.user })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Datos de tarjeta no validos"));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ninguna tarjeta con esa id");
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Datos de tarjeta no validos"));
      } else {
        next(err);
      }
    });
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
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Datos de tarjeta no validos"));
      } else {
        next(err);
      }
    });
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
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Datos de tarjeta no validos"));
      } else {
        next(err);
      }
    });
};
