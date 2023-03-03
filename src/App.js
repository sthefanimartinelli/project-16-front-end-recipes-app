import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import RecipesProvider from './context/RecipesProvider';
import Drinks from './pages/Drinks';
import DrinkDetails from './pages/DrinkDetails';
import MealDetails from './pages/MealDetails';
import MealInProgress from './pages/MealInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route
          path="/meals/:id-da-receita"
          render={ (propsRouter) => (
            <MealDetails { ...propsRouter } />) }
        />
        <Route
          path="/drinks/:id-da-receita"
          render={ (propsRouter) => (
            <DrinkDetails { ...propsRouter } />) }
        />
        <Route
          path="/meals/:id-da-receita/in-progress"
          render={ (propsRouter) => (
            <MealInProgress { ...propsRouter } />) }
        />
        <Route
          path="/drinks/:id-da-receita/in-progress"
          render={ (propsRouter) => (
            <DrinkInProgress { ...propsRouter } />) }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
