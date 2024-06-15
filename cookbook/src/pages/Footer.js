import React from "react";
import "../styles/footer.css";
function Footer() {
  return (
    <footer>
      <img
        src={require("../imgs/CookBook_transparent.png")}
        alt=""
        id="CookBook_logo"
      />
      <div className="team4">
        <h1 id="group_title">CookBook</h1>
        <h3 className="teamtitle">Team 4</h3>
      </div>
    </footer>
  );
}

export default Footer;
