import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";

export function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.validity.valid) {
      setNameError(e.target.validationMessage);
    } else {
      setNameError("");
    }
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
    if (!e.target.validity.valid) {
      setLinkError(e.target.validationMessage);
    } else {
      setLinkError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace({ name, link });
    setName("");
    setLink("");
  };
  return (
    <PopupWithForm
      name={"add"}
      title={"Añadir nuevo lugar"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popout-add__form-title form__input"
        name="cardTitle"
        placeholder="Título"
        type="text"
        required
        minLength="2"
        maxLength="30"
        data-error="span-title"
        value={name}
        onChange={handleNameChange}
      />
      <span className="span-title-error form__input-error">
        {nameError ? nameError : null}
      </span>
      <input
        className="popout-add__form-url form__input"
        name="cardUrl"
        placeholder="Enlace a la imagen"
        type="url"
        required
        data-error="span-url"
        value={link}
        onChange={handleLinkChange}
      />

      <span className="span-url-error form__input-error">
        {linkError ? linkError : null}
      </span>
    </PopupWithForm>
  );
}
