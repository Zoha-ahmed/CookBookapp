import React, { useState } from "react";
import "../styles/upload.css";
import Footer from "./Footer";
import Navbar2 from "./NavBar2";
import FileUploader from "./FileUploader";

const UploadRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeBlurb, setRecipeBlurb] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [prepTime, setPrepTime] = useState("");
  const [servings, setServings] = useState(0);
  const [content, setContent] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [mealType, setMealType] = useState([]);
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [authors, setAuthors] = useState([]);
  const [source, setSource] = useState("");

  const handleAddRecipe = async () => {
    try {
      const recipeData = {
        name: recipeName,
        blurb: recipeBlurb,
        ingredients: ingredients,
        prep_time: prepTime,
        servings: servings,
        content: content,
        cuisine: cuisine,
        meal_type: mealType,
        tags: tags,
        img: imageUrl,
        authors: authors,
        source: source
      };

      const response = await fetch("/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        console.log("Recipe added successfully");
        resetForm();
      } else {
        console.error("Failed to add recipe");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const resetForm = () => {
    setRecipeName("");
    setRecipeBlurb("");
    setIngredients([]);
    setPrepTime("");
    setServings(0);
    setContent([]);
    setCuisine("");
    setMealType([]);
    setTags([]);
    setImageUrl("");
    setAuthors([]);
    setSource("");
  };

  return (
    <>
      <Navbar2 />
      <div className="mainUpload">
        <h2 className="uploadTitle">Upload Recipe</h2>
        <div className="recipeForm">
          <div className="inputGroup">
            <label htmlFor="recipeName">Recipe Name:</label>
            <input
              type="text"
              id="recipeName"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="recipeBlurb">Recipe Blurb:</label>
            <input
              type="text"
              id="recipeBlurb"
              value={recipeBlurb}
              onChange={(e) => setRecipeBlurb(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="ingredients">Ingredients (comma-separated):</label>
            <input
              type="text"
              id="ingredients"
              value={ingredients.join(", ")}
              onChange={(e) => setIngredients(e.target.value.split(", "))}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="prepTime">Prep Time:</label>
            <input
              type="text"
              id="prepTime"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="servings">Servings:</label>
            <input
              type="number"
              id="servings"
              value={servings}
              onChange={(e) => setServings(parseInt(e.target.value))}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="content">Instructions (comma-separated):</label>
            <input
              type="text"
              id="content"
              value={content.join(", ")}
              onChange={(e) => setContent(e.target.value.split(", "))}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="cuisine">Cuisine:</label>
            <input
              type="text"
              id="cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="mealType">Meal Type (comma-separated):</label>
            <input
              type="text"
              id="mealType"
              value={mealType.join(", ")}
              onChange={(e) => setMealType(e.target.value.split(", "))}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="tags">Tags (comma-separated)(vegan):</label>
            <input
              type="text"
              id="tags"
              value={tags.join(", ")}
              onChange={(e) => setTags(e.target.value.split(", "))}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="authors">Authors (comma-separated):</label>
            <input
              type="text"
              id="authors"
              value={authors.join(", ")}
              onChange={(e) => setAuthors(e.target.value.split(", "))}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="source">Source:</label>
            <input
              type="text"
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <button id="add_recipe" onClick={handleAddRecipe}>
            Add to CookBook
          </button>
          </div>
      </div>
      <Footer />
    </>
  );
};

export default UploadRecipe;
