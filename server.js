//Include all needed libraries
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const port = 3000;
var path = require("path");
global.appRoot = path.resolve(__dirname);
const cors = require("cors");
const session = require("express-session");
var bcrypt = require('bcryptjs');
const sanitize = require("mongo-sanitize");
require('dotenv').config();


app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
  })
);

//Set them to be used
app.use(express.static("cookbook/build"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

const recipeSchema = new mongoose.Schema(
  {
    name: String,
    blurb: String,
    ingredients: [String],
    prep_time: String,
    servings: Number,
    content: [String],
    cuisine: String,
    meal_type: [String],
    tags: [String],
    img: String,
    authors: [String],
    source: String,
    id_tag: Number,
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  recipes: [String],
  notes: [String],
});

const hashed_schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  recipes: [String],
  notes: [String],
}, {collection: "users-hashed"});

//Either delete this or rename users-hashed to users once we've dropped the plaintext db
//const Users = mongoose.model("User", userSchema);
const Users = mongoose.model("User", hashed_schema)

const Recipes = mongoose.model("Recipe", recipeSchema);

app.post("/signin", async (req, res) => {
  var { email, password } = req.body;
  email = sanitize(email);
  password = sanitize(password);

  try {
    const check = await Users.findOne({ email: email });
    var checkHash = await bcrypt.compare(password, check.password); //Check to make sure the password is correct
    if (check && checkHash) {
      req.session.isLoggedIn = true;
      req.session.email = email;
      res.json("exist_correct");
    } else {
      res.json("none_exist");
    }
  } catch (e) {
    res.json("error");
  }
});

app.post("/signup", async (req, res) => {
  const  password  = req.body.hashed;

  const email = req.body.email;

  const data = {
    email: email,
    password: password,
    recipies: [],
    notes: [],
  };
  try {
    const check = await Users.findOne({ email: email });
    if (check) {
      res.json("exist");
    } 
    else {
      const newUser = new Users(data);
      await newUser.save();
      res.json("none_exist");
    }
  } catch (e) {
    res.json("error");
  }
});

//Returns list of all recipies
app.get("/recipes_json", async (req, res) => {
  console.log("get /recipes called");
  try {
    const data = await Recipes.find();

    if (!data || data.length === 0) {
      console.log("No recipes found");
      res.status(404).json({ message: "No recipes found" });
      return;
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.get("/recipes_json/:name", async (req, res) => {
  var name = req.params.name;
  console.log(name);
  try {
    const data = await Recipes.find({ name: name });
    if (!data || data.length === 0) {
      console.log("No recipe found");
      res.status(404).json({ message: "No recipe found" });
      return;
    }
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

//Returns the json for the recipe of the given name. If none exist, returns an error stating such

//Given a JSON object that contains the data for a recipe, it will add it to the end of our currently stores json object, then save that object to the file
//If there is an error updating the file, you will be told.



app.post("/recipes", async (req, res) => {
  try {
    const {
      name,
      blurb,
      ingredients,
      prep_time,
      servings,
      content,
      cuisine,
      meal_type,
      tags,
      img,
      authors,
      source,
    } = req.body;

    // Log the received data
    console.log("Recipe Name:", name);
    console.log("Recipe Blurb:", blurb);
    console.log("Ingredients:", ingredients);
    console.log("Prep Time:", prep_time);
    console.log("Servings:", servings);
    console.log("Content:", content);
    console.log("Cuisine:", cuisine);
    console.log("Meal Type:", meal_type);
    console.log("Tags:", tags);
    console.log("Image URL:", img);
    console.log("Authors:", authors);
    console.log("Source:", source);

    // Save the recipe data
    const max_id = await Recipes.findOne()
      .sort({
        id_tag: -1,
      })
      .limit(1);
    const new_id = max_id ? max_id.id_tag + 1 : 1;

    const recipeData = {
      id_tag: new_id,
      name: name,
      blurb: blurb,
      ingredients: ingredients,
      prep_time: prep_time,
      servings: servings,
      content: content,
      cuisine: cuisine,
      meal_type: meal_type,
      tags: tags,
      img: img,
      authors: authors,
      source: source,
    };

    const recipe = new Recipes(recipeData);
    await recipe.save();

    res.send("Recipe added successfully");
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.post("/notes/:email/:recipe", async (req, res) => {

    try{
      const email = req.params.email;
      const recipe = req.params.recipe;
      const notes = req.body.notes;
      const user = await Users.findOne({"email": email});
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const recipeIndex = user.recipes.indexOf(recipe);
      const user_recipes = user.recipes;
      const user_notes = user.notes;
      if (recipeIndex === -1) {
        user_notes.push(notes);
        user_recipes.push(recipe);

        const result = await Users.updateOne({"email":email},{
          $set:{
            "notes":user_notes,
            "recipes":user_recipes}
          })
          console.log(result)
        return res.status(404).json({ message: 'Added recipe and notes' });
      }
      else{
        user_notes[recipeIndex] = notes;
        const result = await Users.updateOne({"email":email},{
          $set:{
            "notes":user_notes
            }
          })
          console.log(result)
        return res.status(404).json({ message: 'Updated notes' });
      }
    }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

app.get("/notes/:email/:recipe", async (req, res) => {
    
    try {
      const email = req.params.email;
      const recipe = req.params.recipe;

      const user = await Users.findOne({"email": email});
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const recipeIndex = user.recipes.indexOf(recipe);
  
      if (recipeIndex === -1) {
        return res.send("NO_NOTE_FOR_USER");
      }

      const note = user.notes[recipeIndex];
      res.send(note);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "cookbook/build", "index.html"));
});

app.listen(port, () => {
  console.log("Listening on *:3000");
});
