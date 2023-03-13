import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { treatAPIdata } from '../helpers/fetchDetails';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './RecipeInProgress.css';
import { favoriteRecipes, isAlreadyFavorite } from '../helpers/favoriteRecipes';

function RecipeInProgress() {
  const [recipeProgress, setRecipeProgress] = useState({});
  const [ingChecked, setIngChecked] = useState([]);
  const [finishBtn, setFinishBtn] = useState('');
  const [isFavorite, setIsFavorite] = useState();
  const [isShared, setIsShared] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();

  const finishRecipe = () => {
    const doneRecipe = {
      id: recipeProgress.id,
      nationality: recipeProgress.nationality,
      name: recipeProgress.name,
      category: recipeProgress.category,
      image: recipeProgress.thumb,
      tags: recipeProgress.tags ? recipeProgress.tags.split(',') : [],
      alcoholicOrNot: recipeProgress.alcoholicOrNot,
      type: recipeProgress.type,
      doneDate: new Date().toISOString(),
    };

    const previousStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    localStorage.setItem('doneRecipes', JSON.stringify([...previousStorage, doneRecipe]));
    console.log([...previousStorage, doneRecipe]);
    history.push('/done-recipes');
  };

  const shareRecipe = () => {
    const mealOrDrink = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    clipboardCopy(`http://localhost:3000/${mealOrDrink}/${id}`);
    if (isShared === false) {
      setIsShared(true);
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
  };

  const checkLocalStorage = () => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes')) !== null
      ? JSON.parse(localStorage.getItem('inProgressRecipes')) : [];
    if (recipeProgress.mealOrDrink && Object.keys(storage).length > 0
      && Object.keys(storage[recipeProgress.mealOrDrink]).includes(recipeProgress.id)) {
      setIngChecked(storage[recipeProgress.mealOrDrink][recipeProgress.id]);
    }
  };

  useEffect(() => {
    if (Object.keys(recipeProgress).length > 0) {
      if (recipeProgress.ingredients.length === ingChecked.length) {
        setFinishBtn(true);
      } else if (recipeProgress.ingredients.length !== ingChecked.length) {
        setFinishBtn(false);
      }
    }
  }, [ingChecked, recipeProgress]);

  useEffect(() => {
    checkLocalStorage();
  }, [recipeProgress]);

  useEffect(() => {
    async function init() {
      await treatAPIdata(pathname, setRecipeProgress);
      checkLocalStorage();
      isAlreadyFavorite(pathname, setIsFavorite);
    }
    init();
  }, []);

  return (
    <div>
      <section>
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
          onClick={ () => favoriteRecipes(recipeProgress, pathname, setIsFavorite) }
        >
          <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="" />
        </button>
        { isShared && <span>Link copied!</span>}
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
      </section>
      <section>
        <button
          className="finish-recipe-btn"
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ !finishBtn }
          onClick={ finishRecipe }
        >
          Finalizar

        </button>
      </section>
    </div>
  );
}

export default RecipeInProgress;
