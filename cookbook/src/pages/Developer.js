import "../styles/developer.css";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Developer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Navbar />
      <div class="timeline">
        <h1 class="meet_dev">
          Meet Our <br />
          Developers
        </h1>
        <div class="wrapper">
          <div class="center-line">
            <Link to="" className="scroll-icon" onClick={scrollToTop}></Link>
          </div>
          <div class="row row-1">
            <section>
              <i class="icon fas fa-magic"></i>
              <div class="details">
                <span class="title">William Chen</span>
                <span>Front-End</span>
              </div>
              <div class="developer_formatting">
                <img src={require("../imgs/chenw21.JPG")} alt="" id="pic" />
                <div class="developer_information">
                  <p>
                    Hey I'm Will! I designed this page and if you have comments
                    or questions, email me!
                  </p>
                  <div class="bottom">
                    <Link to="/developer">Click for More!</Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div class="row row-2">
            <section>
              <i class="icon fas fa-star"></i>
              <div class="details">
                <span class="title">Jake Mandel</span>
                <span>Front-End</span>
              </div>
              <div class="developer_formatting">
                <img src={require("../imgs/jakepic.JPG")} alt="" id="pic" />
                <div class="developer_information">
                  <p>
                    Hey I'm Jake! I helped with the website and if you have
                    comments or questions, email me!
                  </p>
                  <div class="bottom">
                    <Link to="/developer">Click for More!</Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div class="row row-1">
            <section>
              <i class="icon fas fa-rocket"></i>
              <div class="details">
                <span class="title">Jack Sullivan</span>
                <span>Full-Stack</span>
              </div>
              <div class="developer_formatting">
                <img src={require("../imgs/jack.png")} alt="" id="pic" />
                <div class="developer_information">
                  <p>
                    Hey I'm Jack! I helped with the website and if you have
                    comments or questions, email me!
                  </p>
                  <div class="bottom">
                    <Link to="/developer">Click for More!</Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div class="row row-2">
            <section>
              <i class="icon fas fa-paper-plane"></i>
              <div class="details">
                <span class="title">Zoha Ahmed</span>
                <span>Front-End</span>
              </div>
              <div class="developer_formatting">
                <img
                  src={"https://picsum.photos/seed/picsum/200/200"}
                  alt=""
                  id="pic"
                />
                <div class="developer_information">
                  <p>
                    Hey I'm Zoha! I helped with the website and if you have
                    comments or questions, email me!
                  </p>
                  <div class="bottom">
                    <Link to="/developer">Click for More!</Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div class="row row-1">
            <section>
              <i class="icon fas fa-globe"></i>
              <div class="details">
                <span class="title">Emily Goldman</span>
                <span>Back-End & Security</span>
              </div>
              <div class="developer_formatting">
                <img
                  src={"https://picsum.photos/seed/picsum/200/200"}
                  alt=""
                  id="pic"
                />
                <div class="developer_information">
                  <p>
                    Hey I'm Emily! I helped with the website and if you have
                    comments or questions, email me!
                  </p>
                  <div class="bottom">
                    <Link to="/developer">Click for More!</Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div class="row row-2">
            <section>
              <i class="icon fas fa-map-marker-alt"></i>
              <div class="details">
                <span class="title">Stella </span>
                <span>Back-End</span>
              </div>
              <div class="developer_formatting">
                <img src={require("../imgs/StellaG.png")} alt="" id="pic" />

                <div class="developer_information">
                  <p>
                    Hey I'm Stella! I helped with the website and if you have
                    comments or questions, email me!
                  </p>
                  <div class="bottom">
                    <Link to="/developer">Click for More!</Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}

export default Developer;
