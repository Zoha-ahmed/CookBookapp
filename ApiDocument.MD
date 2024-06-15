            CALL TYPE |     CALL LOCATION      |  RETURN
             ---------|------------------------|        
              POST    |  signin                | "exist_correct" if there is an account with the entered details, also sets isLoggedIn = true and email = email.     
                      |                        | "none_exist" if no acconut exist with given details. "error" if there are any caught issues.
              --------|------------------------|                                    
              POST    |  signup                | "exist" if an an acconut already exist with that information. "none_exist" if no acconut exist with that information 
                      |                        |  and creates one to add to the mongo db.
              --------|------------------------|
              POST    |  recipes               | "Recipe added successfully" if the recipe was added to the db. "Internal Server Error" if not added.
              --------|------------------------|
              GET     |  recipes_json          | "No recipes found" if no recipies found (db is empty). Returns recipe database if recipies found. 
                      |                        | "Error fetching data" otherwise.
              --------|------------------------|        
              GET     |  recipes_json/:name    |"No recipes found" if no recipies found with given recipe name. Returns recipe if found. 
                      |                        | "Error fetching data" otherwise.
              --------|------------------------|
              POST    |  notes/:email/:recipe  | "User not found" if the user with the given email doesnt exist. "Added recipe and notes" if the user had no notes on  
                      |                        |  the recipe previouslyn notes and recipe have been added to users database. "Updated notes" if the user had notes on 
                      |                        |  that recipe and they are just being updated. "Server error" otherwise.
              --------|------------------------|
              GET     |  notes/:email/:recipe  | "User not found" if the user with the given email address doesnt exist.
                      |                        | "NO_NOTE_FOR_USER" if the user had no notes on the given recipe.
                      |                        | "Server error" if any calls fail.
                      |                        |  Returns users notes on given recipe otherwise.
              --------|------------------------|
              GET     | * (any other call)     | Returns the file for the home page of the site. 
                   