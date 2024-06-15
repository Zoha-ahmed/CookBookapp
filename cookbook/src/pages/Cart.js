import React from "react";
import "../styles/cart.css";
import Footer from "./Footer";
import Navbar2 from "./NavBar2";

const Cart = () => {
  const handleSearch = () => {
    // Handle search functionality
  };

  const handleRecipeClick = (recipeId) => {
    // Handle clicking on a recipe
    window.location.href = `#recipe${recipeId}`;
  };

  const handleEditCart = () => {
    // Handle editing the cart
  };

  const handleCheckOut = () => {
    // Handle checking out
  };

  return (
    <>
      <Navbar2></Navbar2>
      <div className="mainCart">
        <div className="CartSearch">
          <h1
            id="CartTitle
          "
          >
            Your Cart
          </h1>
          <div className="wrap2">
            <div className="search">
              <input
                type="text"
                className="searchTerm"
                placeholder="Search Cart!"
                onChange={handleSearch}
              />
              <button
                type="button"
                className="searchButton2"
                onClick={handleSearch}
              >
                <h4>Search</h4>
              </button>
            </div>
          </div>
        </div>
        <div className="recipesCart">
          <div className="recipeCart" onClick={() => handleRecipeClick(1)}>
            <img src={require("../imgs/cartlogo.jpg")} alt="Item 1" />
            <br />
            <p>Item 1</p>
          </div>
          <div className="recipeCart" onClick={() => handleRecipeClick(2)}>
            <img src={require("../imgs/cartlogo.jpg")} alt="Item 2" />
            <br />
            <p>Item 2</p>
          </div>
          <div className="recipeCart" onClick={() => handleRecipeClick(3)}>
            <img src={require("../imgs/cartlogo.jpg")} alt="Item 3" />
            <br />
            <p>Item 3</p>
          </div>{" "}
          <div className="recipeCart" onClick={() => handleRecipeClick(4)}>
            <img src={require("../imgs/cartlogo.jpg")} alt="Item 4" />
            <br />
            <p>Item 4</p>
          </div>
          <div className="recipeCart" onClick={() => handleRecipeClick(5)}>
            <img src={require("../imgs/cartlogo.jpg")} alt="Item 5" />
            <br />
            <p>Item 5</p>
          </div>
          <div className="recipeCart" onClick={() => handleRecipeClick(6)}>
            <img src={require("../imgs/cartlogo.jpg")} alt="Item 6" />
            <br />
            <p>Item 6</p>
          </div>
          <div className="recipeCart" onClick={() => handleRecipeClick(7)}>
            <img src={require("../imgs/cartlogo.jpg")} alt="Item 7" />
            <br />
            <p>Item 7</p>
          </div>
          <div className="recipeCart" onClick={() => handleRecipeClick(8)}>
            <img src={require("../imgs/cartlogo.jpg")} alt="Item 8" />
            <br />
            <p>Item 8</p>
          </div>
        </div>
        <div className="UserActions">
          <button onClick={handleEditCart}>Edit Cart</button>
          <button onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Cart;
