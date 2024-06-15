import "../styles/landingpage.css";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useLocation, Link } from "react-router-dom";


function Home() {

  const location=useLocation()
 
  return (
    <>
      <Navbar />
      <div className="main">
        <div id="description">
          <h1 id="description2">Discover and explore recipes and meal plans</h1>
          <h3 id="description3">
            From effortless meal planning and tailored recipe recommendations to
            a vibrant food enthusiast community, CookBook streamlines your
            cooking journey.
          </h3>
          <div className="getstarted">
          {location.state && location.state.id ? (
              <h1>Hello {location.state.id}</h1>
            ) : null}
            <button>
              <Link to="/signup">Get started →</Link>
            </button>
            <div id="questions">
              <h3>Questions?</h3>
              <Link to="/developer" id="Dev">
                Talk to a Dev →
              </Link>
            </div>
          </div>
        </div>
        <img src={require("../imgs/spag.jpeg")} alt="" id="spag" />
      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;
