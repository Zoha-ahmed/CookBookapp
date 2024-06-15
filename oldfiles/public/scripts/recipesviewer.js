$(document).ready(function() {
  var foodName =localStorage.getItem("foodName");
  if(foodName==null){
    foodName="Tofu and Broccoli Fried Rice";
  }
  var theRecipes;
  var settings = {
    "url": window.location.origin+"/recipes/"+foodName,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
  };
  $.ajax(settings).done(function (response) {
    theRecipes = response;
    $('#TheName').html('<a href="'+theRecipes["source"]+'">'+theRecipes["name"]+'</a>');
    var authors_string = "By: ";
    for(var y = 0; y<theRecipes["authors"].length; y++){
      if(y==0){
        authors_string=authors_string+theRecipes["authors"][y];
      }
      else{
        authors_string=authors_string+", "+theRecipes["authors"][y];
      }
    }
    $('#TheAuthors').html(authors_string);
    $('#TheBlurb').html(theRecipes["blurb"]);
    $('#TheImage').html('<img src="'+theRecipes["img"]+'" alt="'+theRecipes["name"]+'"/>');
    var TheIngredients = "";
    for(var y = 0; y<theRecipes["ingredients"].length; y++){
      TheIngredients=TheIngredients+"<li>"+theRecipes["ingredients"][y]+"</li>  ";
    }
    $('#TheIngredients').html(TheIngredients);
    $('#PrepAndServings').html('Prep Time: '+theRecipes["prep_time"]+' <span style="float:right;">Servings: '+theRecipes["servings"]+'</span>');
    var TheSteps = "";
    for(var y = 0; y<theRecipes["content"].length; y++){
      TheSteps=TheSteps+"<li>"+theRecipes["content"][y]+"</li>  ";
    }
    $('#TheSteps').html(TheSteps);
  });
});