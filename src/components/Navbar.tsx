import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="navbar__links">
        <Link to="/">Contact</Link>
        <Link to="#" onClick={() => setIsOpen(!isOpen)}>
          Sign Up
        </Link>
        {isOpen && (
          <div className="navbarHomeInfo__drop">
            <p onClick={() => navigate("/signup/nanny")}>As Nanny</p>
            <p onClick={() => navigate("/signup")}>As Parent</p>
          </div>
        )}
        <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
};

export default Navbar;
