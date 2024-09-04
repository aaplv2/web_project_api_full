import { PopupContext } from "../contexts/PopupProvider";
import PopupWithForm from "./PopupWithForm";
import React, { useContext } from "react";

export function DeleteCardPopup(props) {
  const card = useContext(PopupContext);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    props.onCardDelete(card);
  };

  return (
    <PopupWithForm
      name={"confirm"}
      title={"¿Estas seguro?"}
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleDeleteClick}
    ></PopupWithForm>
  );
}
