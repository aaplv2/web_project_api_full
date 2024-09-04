import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import React, { useContext, useEffect, useState } from "react";

export function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    if (currentUser?.name) {
      setName(currentUser?.name);
      setDescription(currentUser?.about);
    }
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.validity.valid) {
      setNameError(e.target.validationMessage);
    } else {
      setNameError("");
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (!e.target.validity.valid) {
      setDescriptionError(e.target.validationMessage);
    } else {
      setDescriptionError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name={"edit"}
      title={"Acerca de ti"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popout-edit__form-name form__input"
        name="profileName"
        placeholder="Nombre"
        type="text"
        required
        minLength="2"
        maxLength="40"
        data-error="span-name"
        value={name}
        onChange={handleNameChange}
      />
      <span className="span-name-error form__input-error">
        {nameError ? nameError : null}
      </span>
      <input
        className="popout-edit__form-text form__input"
        name="profileAbout"
        placeholder="Acerca de ti"
        type="text"
        required
        minLength="2"
        maxLength="200"
        data-error="span-text"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="span-text-error form__input-error">
        {descriptionError ? descriptionError : null}
      </span>
    </PopupWithForm>
  );
}
