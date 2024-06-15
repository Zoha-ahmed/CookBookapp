$(document).ready(function() {
  var theRecipes;
  var settings = {
    "url": window.location.origin+"/recipes",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    }
  };
  
  $.ajax(settings).done(function (response) {
    theRecipes = response['recipes'];
    console.log(theRecipes);
    for(var y = 0; y<theRecipes.length; y++){
      var x = theRecipes[y];
      $("#recipes").append('<div class="recipe" onclick="getRecipe(\''+x["name"]+'\')"><img src="'+x["image"]+'" alt="Recipe 1" /><p>'+x["name"]+'</p></div>');
    }
  });
  document.getElementById("theSearchButton").onclick = function() {
   // console.log($("#theSearchTerm").val());
    var lowerSearch = $("#theSearchTerm").val().toLowerCase();
    $('#recipes').html("");
    for(var y = 0; y<theRecipes.length; y++){
    //  console.log(lowerSearch);
      var x = theRecipes[y];
      if(lowerSearch==""||x["name"].toLowerCase().includes(lowerSearch)){
        $("#recipes").append('<div class="recipe" onclick="getRecipe(\''+x["name"]+'\')"><img src="'+x["image"]+'" alt="Recipe 1" /><p>'+x["name"]+'</p></div>');
      }
    }
  }
  });
function getRecipe(foodName) {
  localStorage.setItem("foodName",foodName);
  console.log(foodName);
  window.location.href = "recipesviewer.html";
}