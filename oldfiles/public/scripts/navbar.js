export default function NavBar() {
  return (
    <header>
      <div class="CookBook">
        <img src="../imgs/CookBook_transparent.png" alt="" id="CookBook_logo" />
        <h3 id="CompanyName">CookBook</h3>
      </div>
      <div class="info">
        <li>
          <a href="#" id="newspage">
            News Page
          </a>
        </li>
        <li>
          <a href="../html/developer.html" id="team">
            Who We Are
          </a>
        </li>
      </div>
      <div class="login">
        <li>
          <a href="#" id="signin">
            Sign In
          </a>
        </li>
        <li>
          <button>Get started →</button>
        </li>
      </div>
    </header>
  );
}
