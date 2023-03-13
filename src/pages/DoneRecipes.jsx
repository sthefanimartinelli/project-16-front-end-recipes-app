import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipesCard';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [filteredRenderRecipes, setfilteredRenderRecipes] = useState([]);

  const getDoneRecipes = () => {
    const doneRecipesObj = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(doneRecipesObj);
    setfilteredRenderRecipes(doneRecipesObj);
  };

  useEffect(() => {
    getDoneRecipes();
  }, []);

  const handleShareClick = (copiedLink) => {
    copy(copiedLink);
    setShowCopiedMessage(true);
  };

  const handleFilter = (filterType) => {
    if (filterType === 'all') {
      return setfilteredRenderRecipes(doneRecipes);
    }
    const filteredRecipes = doneRecipes.filter((recipe) => recipe.type === filterType);
    return setfilteredRenderRecipes(filteredRecipes);
  };

  return (
    <div>
      { showCopiedMessage && (
        <p>
          Link copied!
        </p>
      ) }
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ ({ target: { value } }) => handleFilter(value) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="meal"
        onClick={ ({ target: { value } }) => handleFilter(value) }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ ({ target: { value } }) => handleFilter(value) }
      >
        Drinks
      </button>
      {filteredRenderRecipes?.map((doneRecipe, index) => (
        <DoneRecipeCard
          key={ index }
          { ...doneRecipe }
          index={ index }
          handleShareClick={ handleShareClick }
        />
      )) }
    </div>
  );
}
export default DoneRecipes;
