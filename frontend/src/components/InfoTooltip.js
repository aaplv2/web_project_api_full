import React from "react";
import "../blocks/popup-infoTooltip.css";
import successIcon from "../images/success-icon.svg";
import errorIcon from "../images/error-icon.svg";
import closeButtonPath from "../images/close-icon.svg";

export default function ({ isInfoTooltipOpen, onClose, isSuccess }) {
  return (
    <div className={`popup-infoTooltip ${isInfoTooltipOpen ? "active" : ""}`}>
      <div className="popup-infoTooltip__content">
        <button
          type="button"
          className="popup-infoTooltip__button-close"
          onClick={onClose}
        >
          <img src={closeButtonPath} alt="Boton de cerrar" className="close" />
        </button>
        <div className="popup-infoTooltip__body">
          <div className="popup-infoTooltip__icon">
            {isSuccess ? (
              <img src={successIcon} alt="Exito" />
            ) : (
              <img src={errorIcon} alt="Error" />
            )}
          </div>
          <h3 className="popup-infoTooltip__title">
            {isSuccess
              ? "¡Correcto!"
              : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
          </h3>
        </div>
      </div>
    </div>
  );
}
