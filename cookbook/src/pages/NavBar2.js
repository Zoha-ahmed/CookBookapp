import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  return (
    <header className="navbar">
      <div className="CookBook">
        <img
          src={require("../imgs/CookBook_transparent.png")}
          alt=""
          id="CookBook_logo"
        />
        <Link to={"/recipes"} id="CompanyName">
          CookBook
        </Link>
      </div>
      <div>
        <Link to={"/"} id="team">
          Log Out
        </Link>
      </div>
      <div>
        <Link to={"/notepad"} id="signin">
          Notes
        </Link>
      </div>
      <div>
        <Link to={"/recipes"} id="team">
          Search
        </Link>
      </div>
      <div>
        <Link to={"/upload"} id="signin">
          Upload
        </Link>
      </div>

      
    </header>
  );
};

export default Navbar2;
