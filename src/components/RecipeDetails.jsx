import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './RecipeDetails.css';

const RECOMENDATION_NUMBER = 6;

function RecipeDetails() {
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [youtubeVideo, setYoutubeVideo] = useState('');
  const [categoryOrAlcoholic, setCategoryOrAlcoholic] = useState('');
  const [recomendation, setRecomendation] = useState([]);

  const location = useLocation();
  const { pathname } = location;

  const isRecipeDone = () => {
    const id = pathname.split('/')[2];
    const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (doneRecipesList.length > 0) {
      return doneRecipesList.some((recipe) => recipe.id === id);
    }
  };

  const isRecipeInProgress = () => {
    const category = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    if (Object.keys(inProgress).length > 0) {
      return Object.keys(inProgress[category]).includes(id);
    }
  };

  const fecthRecomendation = async () => {
    if (pathname.includes('meals')) {
      const responseDetails = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const dataDetails = await responseDetails.json();
      setRecomendation(dataDetails.drinks);
    } else {
      const responseDetails = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const dataDetails = await responseDetails.json();
      setRecomendation(dataDetails.meals);
    }
  };

  const fetchRecipe = async () => {
    const id = pathname.split('/')[2];
    if (pathname.includes('meals')) {
      const responseDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const dataDetails = await responseDetails.json();
      const infoDetails = dataDetails.meals[0];

      const ingredientsObject = Object.fromEntries(Object.entries(infoDetails)
        .filter(([key]) => key.includes('strIngredient')));
      const ingredientsList = Object.values(ingredientsObject);

      const measuresObject = Object.fromEntries(Object.entries(infoDetails)
        .filter(([key]) => key.includes('strMeasure')));
      const measuresList = Object.values(measuresObject);

      const ingredientsNMeasures = ingredientsList.map((item, index) => ({
        ingredient: item,
        measure: measuresList[index],
      }));

      const youtube = details.strYoutube
        ? details.strYoutube.replace('watch?v=', 'embed/') : undefined;

      setDetails(infoDetails);
      setIngredients(ingredientsNMeasures);
      setYoutubeVideo(youtube);
      setCategoryOrAlcoholic(infoDetails.strCategory);
    } else {
      const responseDetails = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const dataDetails = await responseDetails.json();
      const infoDetails = dataDetails.drinks[0];

      const ingredientsObject = Object.fromEntries(Object.entries(infoDetails)
        .filter(([key]) => key.includes('strIngredient')));
      const ingredientsList = Object.values(ingredientsObject);

      const measuresObject = Object.fromEntries(Object.entries(infoDetails)
        .filter(([key]) => key.includes('strMeasure')));
      const measuresList = Object.values(measuresObject);

      const ingredientsNMeasures = ingredientsList.map((item, index) => ({
        ingredient: item,
        measure: measuresList[index],
      }));

      setDetails(infoDetails);
      setIngredients(ingredientsNMeasures);
      setCategoryOrAlcoholic(infoDetails.strAlcoholic);
    }
  };

  useEffect(() => {
    fetchRecipe();
    fecthRecomendation();
  }, []);

  return (
    <>
      { pathname.includes('meals')
        && (
          <div>
            <h1 data-testid="recipe-title">{ details.strMeal }</h1>
            <img
              data-testid="recipe-photo"
              src={ details.strMealThumb }
              alt={ details.strMeal }
            />
            <p data-testid="recipe-category">{ categoryOrAlcoholic }</p>
            <p data-testid="instructions">{ details.strInstructions }</p>
          </div>
        ) }
      { pathname.includes('drinks')
        && (
          <div>
            <h1 data-testid="recipe-title">{ details.strDrink }</h1>
            <img
              data-testid="recipe-photo"
              src={ details.strDrinkThumb }
              alt={ details.strDrink }
            />
            <p data-testid="recipe-category">{ categoryOrAlcoholic }</p>
            <p data-testid="instructions">{ details.strInstructions }</p>
          </div>
        ) }
      <iframe
        src={ youtubeVideo }
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
        data-testid="video"
      />
      {
        ingredients.map((item, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { item.ingredient }
            { item.measure }
          </p>
        ))
      }

      <h1>Recomendados</h1>
      <div className="recomendation-carousel">
        { pathname.includes('meals')
        && (
          recomendation.slice(0, RECOMENDATION_NUMBER).map((item, index) => (
            <div
              className="recomendation-div"
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                className="imgRecomended"
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
              />
              <h2
                data-testid={ `${index}-recommendation-title` }
              >
                {item.strDrink}
              </h2>
            </div>
          ))) }

        { pathname.includes('drinks')
        && (
          recomendation.slice(0, RECOMENDATION_NUMBER).map((item, index) => (
            <div
              className="recomendation-div"
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                className="imgRecomended"
                src={ item.strMealThumb }
                alt={ item.strMeal }
              />
              <h2
                data-testid={ `${index}-recommendation-title` }
              >
                {item.strMeal}
              </h2>
            </div>
          ))) }
      </div>
      { isRecipeInProgress()
        && (
          <button
            className="start-recipe-btn"
            data-testid="start-recipe-btn"
            type="button"
          >
            Continue Recipe
          </button>
        )}
      { !isRecipeDone()
      && (
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
        >
          Start Recipe
        </button>
      )}
    </>
  );
}

export default RecipeDetails;
