$(document).ready(function() {
  console.log("HELLo");
  document.getElementById("add_recipe").onclick = function() {
    if($(recipeName1).val()!=""&&$(recipeImage1).val()!=""){
      const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "name": $(recipeName1).val(),
      "img": $(recipeImage1).val()
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(window.location.origin+"/recipes", requestOptions)
      .then((response) => response.text())
      .then((result) => {console.log(result); window.location.href="recipes.html";})
      .catch((error) => console.error(error));
    }
    else{
      if($(recipeName1).val()==""&&$(recipeImage1).val()==""){
        alert('You need to input a recipe name and image!')
      }
      else if($(recipeName1).val()==""){
        alert('You need to input a recipe name!')
      }
      else{
        alert('You need to input a recipe image!')
      }
    }
  }
});