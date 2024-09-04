import React, { useEffect } from "react";
import closeButtonPath from "../images/close-icon.svg";

function ImagePopup(props) {
  useEffect(() => {
    function escapeKeydown(evt) {
      if (evt.key === "Escape") {
        props.onClose();
      }
    }

    document.addEventListener("keydown", escapeKeydown);

    return () => {
      document.removeEventListener("keydown", escapeKeydown);
    };
  }, []);
  return (
    <div className={`popout-image ${props.isOpen ? "active" : ""}`}>
      <button
        className={`popout-image__button-close`}
        type="button"
        onClick={props.onClose}
      >
        <img src={closeButtonPath} alt="Boton de cerrar" className="close" />
      </button>
      <img
        className={`popout-image__image`}
        src={props.card.link}
        alt={props.card.name}
      />
      <p className={`popout-image__title`}>{props.card.name}</p>
    </div>
  );
}

export default ImagePopup;
