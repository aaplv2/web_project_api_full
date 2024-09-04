import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as auth from "../utils/auth.js";
import "../blocks/register.css";
import InfoTooltip from "./InfoTooltip.js";

export default function Register({
  handleRegister,
  handleCloseTooltip,
  isInfoTooltipOpen,
  setIsInfoTooltipOpen,
  isSuccess,
  setIsSuccess,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .register(email, password)
      .then((data) => {
        if (data._id) {
          setEmail("");
          setPassword("");
          handleRegister();
          setIsSuccess(true);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        setErrorMessage("Error de autorización.");
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  return (
    <div className="register">
      <h2 className="register__title">Regístrate</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__form-input"
          type="email"
          name="email"
          value={email}
          placeholder="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <input
          className="register__form-input"
          type="password"
          name="password"
          value={password}
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>

        {errorMessage && (
          <InfoTooltip
            isInfoTooltipOpen={isInfoTooltipOpen}
            onClose={handleCloseTooltip}
            isSuccess={isSuccess}
          />
        )}

        <button className="register__button" type="submit">
          Regístrate
        </button>
      </form>
      <p className="register__signin">
        ¿Ya eres miembro? {""}
        <Link to="/signin" className="register__link">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}
