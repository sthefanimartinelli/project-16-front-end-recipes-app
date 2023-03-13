import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { treatAPIdata } from '../helpers/fetchDetails';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const [recipeProgress, setRecipeProgress] = useState({});
  const [ingChecked, setIngChecked] = useState([]);
  const [finishBtn, setFinishBtn] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  const ingOnStorageLength = () => {
    // console.log(Object.keys(recipeProgress).length > 0);
    if (Object.keys(recipeProgress).length > 0) {
      const sizeIngArray = recipeProgress.ingredients.length;
      if (sizeIngArray === ingChecked.length) {
        setFinishBtn(true);
      }
      setFinishBtn(false);
    }
  };

  // Código feito com ajuda do Vinícius José
  const isIngredientChecked = (checked, ingredient) => {
    if (checked) {
      setIngChecked([...ingChecked, ingredient]);
      if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
        const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
        getStorage[recipeProgress
          .mealOrDrink][recipeProgress.id] = [...ingChecked, ingredient];
        localStorage.setItem('inProgressRecipes', JSON.stringify(getStorage));
      } else {
        const objInitiate = {
          drinks: {},
          meals: {},
        };
        objInitiate[recipeProgress
          .mealOrDrink] = {
          [recipeProgress.id]: [...ingChecked, ingredient],
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(objInitiate));
      }
    } else {
      setIngChecked(ingChecked.filter((item) => item !== ingredient));
      if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
        const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
        getStorage[recipeProgress
          .mealOrDrink][recipeProgress.id] = ingChecked
          .filter((item) => item !== ingredient);
        localStorage.setItem('inProgressRecipes', JSON.stringify(getStorage));
      } else {
        const objInitiate = {
          drinks: {},
          meals: {},
        };
        objInitiate[recipeProgress
          .mealOrDrink] = {
          [recipeProgress.id]: ingChecked.filter((item) => item !== ingredient),
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(objInitiate));
      }
    }
    // ingOnStorageLength();
  };

  const checkLocalStorage = () => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes')) !== null
      ? JSON.parse(localStorage.getItem('inProgressRecipes')) : [];
    if (recipeProgress.mealOrDrink && Object.keys(storage).length > 0
      && Object.keys(storage[recipeProgress.mealOrDrink]).includes(recipeProgress.id)) {
      setIngChecked(storage[recipeProgress.mealOrDrink][recipeProgress.id]);
    }
    // ingOnStorageLength();
  };

  useEffect(() => {
    ingOnStorageLength();
  }, [ingChecked, recipeProgress]);

  useEffect(() => {
    checkLocalStorage();
  }, [recipeProgress]);

  useEffect(() => {
    async function init() {
      await treatAPIdata(pathname, setRecipeProgress);
      checkLocalStorage();
      ingOnStorageLength();
    }
    init();
  }, []);

  return (
    <div>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <h1 data-testid="recipe-title" alt="">{ recipeProgress.name }</h1>
      <img
        data-testid="recipe-photo"
        src={ recipeProgress.thumb }
        alt={ recipeProgress.name }
      />
      <p
        data-testid="recipe-category"
      >
        { recipeProgress.type === 'meal'
          ? recipeProgress.category : recipeProgress.alcoholicOrNot }
      </p>
      <p data-testid="instructions">{ recipeProgress.instructions }</p>

      { recipeProgress.ingredients && recipeProgress.ingredients.map((item, index) => (
        <label
          htmlFor={ item.ingredient }
          style={ { textDecoration: (ingChecked.includes(item.ingredient)
            ? 'line-through solid rgb(0, 0, 0)' : 'none') } }
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <span>{ item.ingredient }</span>
          <input
            id={ item.ingredient }
            type="checkbox"
            checked={ ingChecked.includes(item.ingredient) }
            onClick={ ({ target: { checked } }) => {
              isIngredientChecked(checked, item.ingredient);
            } }
          />
        </label>
      ))}
      <br />
      <button
        className="finish-recipe-btn"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !finishBtn }
      >
        Finalizar

      </button>
    </div>
  );
}

export default RecipeInProgress;
