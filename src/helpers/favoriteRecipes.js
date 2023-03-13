export const favoriteRecipes = (details, pathname, setIsFavorite) => {
  const { id, type, nationality, category, alcoholicOrNot, name, thumb } = details;

  const newFavoriteRecipe = ({
    id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image: thumb,
  });

  const favoritesOnStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (favoritesOnStorage.length > 0) {
    const isItemFavorite = favoritesOnStorage.some((fav) => fav.id === id);
    if (isItemFavorite) {
      const newFavoritesArray = favoritesOnStorage
        .filter((favorite) => favorite.id !== id);
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
