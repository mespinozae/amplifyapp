import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Login
      </NavLink>
      {" | "}
      <NavLink to="/register" activeStyle={activeStyle}>
        Registro
      </NavLink>
      {" | "}
      <NavLink to="/validation" activeStyle={activeStyle}>
        Validacion
      </NavLink>
    </nav>
  );
};

export default Header;
