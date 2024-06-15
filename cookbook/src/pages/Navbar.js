import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="CookBook">
        <img
          src={require("../imgs/CookBook_transparent.png")}
          alt=""
          id="CookBook_logo"
        />
        <Link to={"/"} id="CompanyName">
          CookBook
        </Link>
      </div>
      <div className="developer">
        <Link to={"/developer"} id="team">
          Who Are We
        </Link>
      </div>
      <div className="signin">
  {localStorage.getItem('isLoggedIn') === 'true' ? (
    <Link to={"/recipes"} id="signin">
      Sign In
    </Link>
  ) : (
    <Link to={"/signin"} id="signin">
      Sign In
    </Link>
  )}
</div>
<div className="signup">
  {localStorage.getItem('isLoggedIn') === 'true' ? (
    <Link to={"/recipes"} id="signup">
      <button>Get started →</button>
    </Link>
  ) : (
    <Link to={"/signup"} id="signup">
      <button>Get started →</button>
    </Link>
  )}
</div>

    </header>
  );
};

export default Navbar;
