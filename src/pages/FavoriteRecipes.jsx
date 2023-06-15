import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [messageCopied, setMessageCopied] = useState(false);

  const getFavoriteRecipes = () => {
    const localStorageFavorites = JSON
      .parse(localStorage.getItem('favoriteRecipes'));

    setFavoriteRecipes(localStorageFavorites);
    setFiltered(localStorageFavorites);
  };

  useEffect(() => {
    getFavoriteRecipes();
  }, []);

  const handleShareClick = (copiedLink) => {
    copy(copiedLink);
    setMessageCopied(true);
  };

  // const handleFavorite = (id) => {
  //   const newFavorite = favoriteRecipes.filter((recipe) => recipe.id !== id);
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
  //   setFavoriteRecipes(newFavorite);
  // };

  const handleFilter = (filterType) => {
    if (filterType === 'all') {
      return setFiltered(favoriteRecipes);
    }
    const filteredRecipes = favoriteRecipes
      .filter((recipe) => recipe.type === filterType);
    return setFiltered(filteredRecipes);
  };

  return (
    <div>
      { messageCopied && (
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
      {filtered?.map((favRecipe, index) => (
        <RecipeCard
          key={ index }
          { ...favRecipe }
          index={ index }
          handleShareClick={ handleShareClick }
          // handleFavorite={ handleFavorite }
        />
      )) }
    </div>
  );
}

export default FavoriteRecipes;
