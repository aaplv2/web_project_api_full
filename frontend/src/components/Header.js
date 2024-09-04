import { Link, useLocation } from "react-router-dom";
import logoAroundPath from "../images/around-the-us-white.svg";

function Header({ isLoggedIn, isUser, onLogout }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__content">
        <img
          className="header__logo"
          src={logoAroundPath}
          alt="Logo Around The U.S."
        />
        <nav className="header__nav">
          {isLoggedIn ? (
            <>
              <div>
                <Link to="/profile" className="header__link">
                  {isUser}
                </Link>
                <Link className="header__button" onClick={onLogout}>
                  Cerrar sesión
                </Link>
              </div>
            </>
          ) : (
            <>
              {location.pathname === "/signin" ? (
                <Link to="/signup" className="header__link">
                  Registrarse
                </Link>
              ) : (
                <Link to="/signin" className="header__link">
                  Iniciar Sesión
                </Link>
              )}
            </>
          )}
        </nav>
      </div>

      <div className="header__line"></div>
    </header>
  );
}

export default Header;
