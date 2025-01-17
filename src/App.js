import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import RecipeSearch from './components/RecipeSearch';
import RecipeDetails from './components/RecipeDetails';
// import GroceryList from '...';

const App = () => {
  //state that holds a single object of each query
  const [recipes, setRecipes] = useState();
  //state used to render the recipe tiles on recipeSearch page
  const [recipeDetail, setRecipeDetail] = useState(null)
  const [groceries, setGroceries] = useState([]);
  const [user, setUser] = useState(false);
  
  //send request to server for recipes from API
  const getRecipes = (e) => {
    e.preventDefault();
      //req perams for the search
      //request recipes based on the client entry in the search bar
    fetch(`/recipes/search/?id=${e.target.recipe.value}`)
    .then(resp => resp.json())
    .then(data => {
      //updating the state to be equal to an object that contains the recipies as keys to utilize for the backend
      setRecipes(data);
      getPricing(data);
    })
  }
  
  //calling this funciton for every recipe loaded on the recipeSearch page
  const fetchApi = (key, value) => {
    return new Promise(resolve => {
    //sending the backend a post request that is an object, with the recipe as key and the array of ingredients as the value
    fetch('/recipes/ingredients', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({[key]: value}),
    })
    .then(resp => resp.json())
    .then(data => {
      resolve(data);
    })
  })
  }

  //get pricing on all ingredients from each recipe
  const getPricing = async (recipes) => {
    //grab each recipe from the recipes object
    for (let key in recipes) {
      //create empty array to push all of the ingredients as a string into
      const ingredients = [];
      //grab each ingredient from the list
      for (let i = 0; i < recipes[key].ingredientDetails.length; i++) {
        ingredients.push(recipes[key].ingredientDetails[i].food)
      }
      const data = await fetchApi(key, ingredients)

      const recipeName = key;
      let detailedIngredients = recipes[recipeName].ingredientDetails
      //iterate through the ingredients
      let currentFood;
      let price = 0;
      for(let i = 0; i < detailedIngredients.length; i++){
        currentFood = detailedIngredients[i].food;
        detailedIngredients[i].food = data[recipeName][currentFood];
        // detailedIngredients[i].food.name = currentFood;
        price = price + data[recipeName][currentFood].price;
      }

      //make a copy of the recipe
      setRecipes((oldrecipe) => {
        console.log("Old Recipe:", oldrecipe);
        let newRecipes = JSON.parse(JSON.stringify(oldrecipe));
        newRecipes[recipeName].ingredientDetails = detailedIngredients
        if(!price) {
          newRecipes[recipeName].price = 'Item(s) not available at Kroger'
        }else {
          newRecipes[recipeName].price = price;
        }
        return newRecipes
      })
    }
  }
  //function for adding the selected recipe ingredients to the Grocery List and Database
  const addToGroceryList = (e) => {

  }

  return (
    <Router>
      <Header 
      user={user}
      setUser={setUser}
      />
      <Routes>
        <Route path='/' element={<RecipeSearch
          recipes={recipes}
          getRecipes={getRecipes}
          setRecipeDetail={setRecipeDetail}
          />}
          />  
        <Route path='/recipes' element={<RecipeDetails
          recipes={recipes}
          recipeDetail={recipeDetail}
          setGroceries={setGroceries}
          user={user}
          />} 
          />
        {/* <Route path='/groceries' element={<GroceryList
          groceries={groceries}
          setGroceries={setGroceries}
          />} 
          />      */}
      </Routes>
    </Router>
  )
}

export default App;