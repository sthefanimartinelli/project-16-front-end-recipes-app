import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [recipesFiltered, setRecipesFiltered] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [details, setDetails] = useState({
    id: '',
    mealOrDrink: '',
    thumb: '',
    name: '',
    category: '',
    ingredients: [],
    youtube: '',
  });

  const context = useMemo(() => ({
    recipes,
    recipesFiltered,
    details,
    allRecipes,
    setRecipes,
    setRecipesFiltered,
    setDetails,
    setAllRecipes,
  }), [recipes, recipesFiltered, details, allRecipes]);

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default RecipesProvider;
