import { useEffect, useState } from "react";
import closeButtonPath from "../images/close-icon.svg";

function PopupWithForm(props) {
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
    <div>
      <div className={`popout-${props.name} ${props.isOpen ? "active" : ""}`}>
        <h4 className={`popout-${props.name}__title`}>{props.title}</h4>
        <button
          className={`popout-${props.name}__button-close`}
          type="button"
          onClick={props.onClose}
        >
          <img src={closeButtonPath} alt="Boton de cerrar" className="close" />
        </button>
        <form
          className={`popout-${props.name}__form form`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            className={`popout-${props.name}__button-save form__submit`}
            type="submit"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
