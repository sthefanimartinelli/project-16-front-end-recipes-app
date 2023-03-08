import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import MealsDetails from './pages/MealsDetails';
import DrinksDetails from './pages/DrinksDetails';
import MealInProgress from './pages/MealInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="App">
      <RecipesProvider>
        <Switch>
          <Route
            exact
            path="/"
            component={ Login }
          />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route
            exact
            path="/meals/:id"
            component={ MealsDetails }
          />
          <Route
            exact
            path="/drinks/:id"
            component={ DrinksDetails }
          />
          <Route
            exact
            path="/meals/:id/in-progress"
            component={ MealInProgress }
          />
          <Route
            exact
            path="/drinks/:id/in-progress"
            component={ DrinkInProgress }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </RecipesProvider>
    </div>
  );
}

export default App;
