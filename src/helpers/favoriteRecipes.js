export const favoriteRecipes = (recipe, pathname, setIsFavorite) => {
  const id = pathname.split('/')[2];
  const type = pathname.includes('meals') ? 'meal' : 'drink';

  const name = pathname.includes('meals') ? recipe.strMeal : recipe.strDrink;
  const image = pathname.includes('meals')
    ? recipe.strMealThumb : recipe.strDrinkThumb;
  const nationality = recipe.strArea ? recipe.strArea : '';
  const alcoholicOrNot = recipe.strAlcoholic ? recipe.strAlcoholic : '';
  const category = recipe.strCategory ? recipe.strCategory : '';

  const newFavoriteRecipe = ({
    id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
  });

  const favoritesOnStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (favoritesOnStorage.length > 0) {
    const isItemFavorite = favoritesOnStorage.some((fav) => fav.id === id);
    if (isItemFavorite) {
      const newFavoritesArray = favoritesOnStorage
        .filter((favourite) => favourite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesArray));
      return setIsFavorite(false);
    }
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([...favoritesOnStorage, newFavoriteRecipe]));
    return setIsFavorite(true);
  }
  localStorage.setItem('favoriteRecipes', JSON
    .stringify([newFavoriteRecipe]));
  return setIsFavorite(true);
};

export const isAlreadyFavorite = (pathname, setIsFavorite) => {
  const id = pathname.split('/')[2];
  const favoritesOnStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (favoritesOnStorage.length > 0) {
    const isItemFavorite = favoritesOnStorage.some((fav) => fav.id === id);
    if (isItemFavorite) {
      return setIsFavorite(true);
    }
    return setIsFavorite(false);
  }
  return setIsFavorite(false);
};
