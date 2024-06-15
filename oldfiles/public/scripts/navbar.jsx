import React from "react";

class Navbar extends React.Component {
  render() {
    <header class="navbar">
      <div class="CookBook">
        <a href="landingpage.html" id="clickable">
          <img
            src="../imgs/CookBook_transparent.png"
            alt=""
            id="CookBook_logo"
          />
          <h3 id="CompanyName">CookBook</h3>
        </a>
      </div>
      <div class="login">
        <li>
          <a href="../html/developer.html" id="team">
            Who We Are
          </a>
        </li>
        <li>
          <a href="../html/sign_in.html" id="signin">
            Sign In
          </a>
        </li>
      </div>
      <div class="info">
        <li>
          <button>
            <a href="../html/sign_up.html">Get started →</a>
          </button>
        </li>
      </div>
    </header>;
  }
}

const styles = {};

export default Navbar;
