import React, { useContext } from "react";

import deleteButtonPath from "../images/card-trash.svg";
import likeButtonPath from "../images/card-like.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
  const handleCardClick = () => {
    props.onCardClick(props.card);
  };

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  };

  const handleDeleteClick = () => {
    props.onDeleteCardClick(props.card);
  };

  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(
    (cardId) => cardId._id === currentUser._id
  );

  return (
    <div className="card">
      <div className="card__top">
        <button
          className={`card__button-trash ${isOwn ? "" : "hidden"}`}
          id="button-trash"
          onClick={handleDeleteClick}
        >
          <img src={deleteButtonPath} alt="Botón eliminar" />
        </button>
        <img
          className="card__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleCardClick}
        />
      </div>
      <div className="card__bottom">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__button">
          <button
            className={`card__button-like ${isLiked ? "active" : ""}`}
            onClick={handleLikeClick}
          >
            <img src={likeButtonPath} alt="Botón like" />
          </button>
          <label className="card__button-counter">
            {props.card.likes.length}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Card;
