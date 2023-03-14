import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './RecipeDetails.css';
import clipboardCopy from 'clipboard-copy';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { favoriteRecipes, isAlreadyFavorite } from '../helpers/favoriteRecipes';
import { goToStartRecipe } from '../helpers/startRecipe';
import { fecthRecomendation, treatAPIdata } from '../helpers/fetchDetails';
import RecipesContext from '../context/RecipesContext';

const RECOMENDATION_NUMBER = 6;

function RecipeDetails() {
  const [recomendation, setRecomendation] = useState([]);
  const [isShared, setIsShared] = useState(false);
  const [isFavorite, setIsFavorite] = useState();

  const context = useContext(RecipesContext);
  const { details, setDetails } = context;

  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const shareRecipe = () => {
    clipboardCopy(`http://localhost:3000${pathname}`);
    if (isShared === false) {
      setIsShared(true);
    }
  };

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

  useEffect(() => {
    treatAPIdata(pathname, setDetails);
    fecthRecomendation(pathname, setRecomendation);
    isAlreadyFavorite(pathname, setIsFavorite);
  }, []);

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => shareRecipe() }
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        type="button"
        data-testid="favorite-btn"
        onClick={ () => favoriteRecipes(details, pathname, setIsFavorite) }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt=""
        />
      </button>
      { isShared && <span>Link copied!</span>}
      <div>
        <h1 data-testid="recipe-title">{ details.name }</h1>
        <img
          data-testid="recipe-photo"
          src={ details.thumb }
          alt={ details.name }
        />
        { details.mealOrDrink === 'meals'
          ? <p data-testid="recipe-category">{ details.category }</p>
          : <p data-testid="recipe-category">{ details.alcoholicOrNot }</p>}
        <p data-testid="instructions">{ details.instructions }</p>
      </div>
      { details.youtube
      && <iframe
        src={ details.youtube }
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
        data-testid="video"
      />}

      { details.ingredients.map((item, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          { item.ingredient }
          { item.measure }
        </p>
      ))}

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
            onClick={ () => goToStartRecipe(pathname, history) }
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
          onClick={ () => goToStartRecipe(pathname, history) }
        >
          Start Recipe
        </button>
      )}
    </>
  );
}
export default RecipeDetails;
