import "../styles/recipes.css";
import Footer from "./Footer";
import Navbar2 from "./NavBar2";
import Note from "./Note";
import React, { useState } from 'react';

function Recipes() {
  const [FeaturedOn, setFeaturedOn] = useState({});
  const [SearchOn, setSearchOn] = useState({display: 'none'});
  const [ResultsOn, setResultsOn] = useState({display: 'none'});
  const [theSearchValue, settheSearchValue] = useState("");
  const [SearchResults, setSearchResults] = useState();
  const [theAuthors, settheAuthors] = useState("By: Southern Living");
  const [theUrl, settheUrl] = useState("https://www.myrecipes.com/recipe/pan-seared-filet-mignon");
  const [theName, settheName] = useState("Pan-Seared Filet Mignon");
  const [theBlurb, settheBlurb] = useState("Prepare this simple, but outstanding seared beef tenderloin recipe for guests.");
  const [theImage, settheImage] = useState("https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2008%2F10%2F16%2Fmyrecipes-pan-seared-filet-mignon-4x3-1-2000.jpg");
  const [TheIngredients, settheIngredients] = useState([<li>4 (6-oz) beef tenderloin fillets</li>,<li>1 teaspoon freshly cracked pepper</li>,<li>1/2 teaspoon kosher salt</li>,<li>2 tablespoons butter</li>,<li>2 tablespoons olive oil</li>]);
  const [TheSteps, settheSteps] = useState([<li>Sprinkle fillets with pepper salt.</li>,<li>Melt butter with olive oil in a large stainless steel or cast-iron skillet over medium heat. Add fillets, and cook 5 to 7 minutes on each side or to desired degree of doneness. Let stand 5 minutes.</li>]);
  const [PrepTime, setPrepTime] = useState("30 Minutes");
  const [ServingSize, setServingSize] = useState("4");
  const [BackAllOn, setBackAllOn] = useState({display: 'none'});
  const [Next10, setNext10] = useState(0);
  const [Current10, setCurrent10] = useState(0);
  const [Prev10, setPrev10] = useState(0);
  const [DoBack10, setDoBack10] = useState({display: 'none'});
  const [DoNext10, setDoNext10] = useState({display: 'none'});
  const [DoBack10All, setDoBack10All] = useState({});
  const [SearchNext, setSearchNext] = useState("");

  React.useEffect(() => {
    doSearch();
  }, []);
  const showItem = (the_name) => {
    setBackAllOn({});
    setFeaturedOn({display: 'none'});
    setSearchOn({display: 'none'});
    setDoBack10All({display: 'none'});
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    console.log(window.location.origin+"/recipes_json/"+the_name);
    fetch(window.location.origin+"/recipes_json/"+the_name, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const theRecipes = result[0];
        var authors_string = "By: ";
        for(var y = 0; y<theRecipes["authors"].length; y++){
          if(y==0){
            authors_string=authors_string+theRecipes["authors"][y];
          }
          else{
            authors_string=authors_string+", "+theRecipes["authors"][y];
          }
        }
        settheAuthors(authors_string);
        settheBlurb(theRecipes["blurb"]);
        settheUrl(theRecipes["source"]);
        settheName(theRecipes["name"]);
        settheImage(theRecipes["img"]);
        const TheIngredients = [];
        for(var y = 0; y<theRecipes["ingredients"].length; y++){
          TheIngredients.push(theRecipes["ingredients"][y]);
        }
        const TheIngredientsI = TheIngredients.map(ingredient => <li>{ingredient}</li>)
        settheIngredients(TheIngredientsI);
        setPrepTime(theRecipes["prep_time"]);
        setServingSize(theRecipes["servings"]);
        const TheSteps = [];
        for(var y = 0; y<theRecipes["content"].length; y++){
          TheSteps.push(theRecipes["content"][y]);
        }
        const TheStepsI = TheSteps.map(step => <li>{step}</li>)
        settheSteps(TheStepsI);
        setResultsOn({});
      })
      .catch((error) => console.error(error));
  }
  const doSearchNext = () => {
    setPrev10(Current10);
    setCurrent10(Next10);
    setFeaturedOn({display: 'none'});
    setResultsOn({display: 'none'});
    setBackAllOn({display: 'none'});
    setSearchOn({});
    const lowerSearch = SearchNext.toLowerCase();
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(window.location.origin+"/recipes_json", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const storevars = [];
        var theResultLength = result.length-Next10;
        setDoNext10({display: 'none'})
        if(Next10!=0){
          setDoBack10({});
        }
        setDoNext10({display:'none'});
        var thecatch=0;
        for(var y = Next10; y<theResultLength+Next10; y++){
        //  console.log(lowerSearch);
          const x = result[y];
         // console.log(lowerSearch);
          if(lowerSearch==""||x["name"].toLowerCase().includes(lowerSearch)){
            storevars.push(<div class="recipe" id="recipeItem" onClick={() => showItem(x["name"])}><img src={x["img"]} alt="Recipe 1" /><p>{x["name"]}</p></div>);
            if(thecatch==10&&y!=theResultLength-1){
              setNext10(y+1);
              setDoNext10({});
              break;
            }
            //recipes+=<div class="recipe" onclick=""><img src={x["image"]} alt="Recipe 1" /><p>'+x["name"]+'</p></div>;
           // console.log(x);
          }
        }
        setNext10(Next10+10);
        setSearchResults(storevars);
      })
      .catch((error) => console.error(error));
  }
  const doSearchBack = () => {
    setFeaturedOn({display: 'none'});
    setResultsOn({display: 'none'});
    setBackAllOn({display: 'none'});
    setSearchOn({});
    const lowerSearch = SearchNext.toLowerCase();
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(window.location.origin+"/recipes_json", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var newNext10 = Prev10;
        setCurrent10(Prev10);
        const storevars = [];
        var theResultLength = result.length-newNext10;
        if(newNext10>0){
          setDoBack10({});
        }
        else{
          setDoBack10({display:'none'});
        }
        if(newNext10<0){
          newNext10=0;
        }
        setDoNext10({display:'none'});
        var thebackcatch = 0;
        var thebackcatchbool = false;
        for(var y = newNext10-1; y>0; y--){
          const x = result[y];
          if(lowerSearch==""||x["name"].toLowerCase().includes(lowerSearch)){
            thebackcatch++;
            if(thebackcatch==20&&y!=theResultLength-1&&thebackcatchbool==false){
              setPrev10(y);
              thebackcatchbool=true;
            }
            //recipes+=<div class="recipe" onclick=""><img src={x["image"]} alt="Recipe 1" /><p>'+x["name"]+'</p></div>;
           // console.log(x);
          }
        }  
        if(thebackcatchbool==false){
          setPrev10(0);
        }
        var thecatch=0;
        for(var y = newNext10; y<theResultLength+newNext10; y++){
        //  console.log(lowerSearch);
          const x = result[y];
         // console.log(lowerSearch);
          if(lowerSearch==""||x["name"].toLowerCase().includes(lowerSearch)){
            storevars.push(<div class="recipe" id="recipeItem" onClick={() => showItem(x["name"])}><img src={x["img"]} alt="Recipe 1" /><p>{x["name"]}</p></div>);
            thecatch++;
            if(thecatch==10&&y!=theResultLength-1){
              setNext10(y+1);
              setDoNext10({});
              break;
            }
            //recipes+=<div class="recipe" onclick=""><img src={x["image"]} alt="Recipe 1" /><p>'+x["name"]+'</p></div>;
           // console.log(x);
          }
        }
        setNext10(newNext10+10);
        setSearchResults(storevars);
      })
      .catch((error) => console.error(error));
  }
  const doSearchBackAll = () => {
    setFeaturedOn({display: 'none'});
    setResultsOn({display: 'none'});
    setBackAllOn({display: 'none'});
    setSearchOn({});
    setDoBack10All({});
  }
  const doSearch = () => {
    setFeaturedOn({display: 'none'});
    setResultsOn({display: 'none'});
    setBackAllOn({display: 'none'});
    setDoBack10({display:'none'});
    setSearchOn({});
    setNext10(10);
    const lowerSearch = theSearchValue.toLowerCase();
    setSearchNext(theSearchValue);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(window.location.origin+"/recipes_json", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const storevars = [];
        var thecatch = 0;
        var theResultLength = result.length;
        setDoNext10({display:'none'});
        setPrev10(0);
        setCurrent10(0);
        for(var y = 0; y<theResultLength; y++){
        //  console.log(lowerSearch);
          const x = result[y];
         // console.log(lowerSearch);
          if(lowerSearch==""||x["name"].toLowerCase().includes(lowerSearch)){
            thecatch++;
            storevars.push(<div class="recipe" id="recipeItem" onClick={() => showItem(x["name"])}><img src={x["img"]} alt="Recipe 1" /><p>{x["name"]}</p></div>);
            if(thecatch==10&&y!=theResultLength-1){
              setNext10(y+1);
              setDoNext10({});
              break;
            }
            //recipes+=<div class="recipe" onclick=""><img src={x["image"]} alt="Recipe 1" /><p>'+x["name"]+'</p></div>;
           // console.log(x);
          }
        }
        setSearchResults(storevars);
      })
      .catch((error) => console.error(error));
  }
  return (
    <>
      <Navbar2></Navbar2>
      <div class="recipepage">
      
        <div class="body">
          <div>
            <img
              src={require("../imgs/SearchRecipes.png")}
              alt=""
              id="searchframe"
            />
          </div>
          <div>
            <div class="wrap1">
              <div class="search">
                <div style={BackAllOn}>
                  <button type="submit" class="searchButtonLeft" id="theSearchButton" onClick={doSearchBackAll}>
                    <h4>Back</h4>
                  </button>
                </div>
                <div style={DoBack10All}>
                  <div style={DoBack10}>
                    <button type="submit" class="searchButtonLeft" id="theSearchButton" onClick={doSearchBack}>
                      <h4>Last 10</h4>
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  class="searchTerm"
                  id="theSearchTerm"
                  placeholder="Let's Chef It Up!"
                  value={theSearchValue}
                  onChange={(e) => settheSearchValue(e.target.value)}
                />
                <button type="submit" class="searchButton" id="theSearchButton" onClick={doSearch}>
                  <h4>Search</h4>
                </button>
                <div style={DoBack10All}>
                  <div style={DoNext10}>
                    <button type="submit" class="searchButton" id="theSearchButton" onClick={doSearchNext}>
                      <h4>Next 10</h4>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="recipes" style={SearchOn}>{SearchResults}</div>
            <div style={ResultsOn}>
            <div class="main3">
              <h1 id="TheName"><a href={theUrl}>{theName}</a></h1>
              <h2 id="TheAuthors" style={{fontWeight: 600, paddingTop: "1em"}}>{theAuthors}</h2>
              <h3 id="TheBlurb" style={{fontWeight: 600, paddingTop: "1em"}}>{theBlurb}</h3>
              <span id="TheImage"><img src={theImage} alt={theName} /></span>
              <div class="recipes" id="the_recipe">
                <div class="recipe">
                  <h2 style={{fontWeight: 600, margin: "20px"}}>Ingredients:</h2>
                  <ul id="TheIngredients">
                    {TheIngredients}
                  </ul>
                </div>
                <div class="recipe" id="CookingInstructions">
                  <h2 style={{fontWeight: 600, margin: "20px"}}>Cooking Instructions:</h2>
                  <h3 id="PrepAndServings" style={{fontWeight: 600, margin: "20px"}}>Prep Time: {PrepTime} <span style={{textAlign:"right"}}>Servings: {ServingSize}</span></h3>
                  <ul id="TheSteps">
                    {TheSteps}
                  </ul>
                </div>
              </div>
            </div>
            </div>
            <div style={FeaturedOn}>
             
            </div>  
          </div>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}

export default Recipes;
