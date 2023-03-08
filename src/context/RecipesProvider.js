import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [recipesFiltered, setRecipesFiltered] = useState([]);

  const context = useMemo(() => ({
    recipes,
    recipesFiltered,
    setRecipes,
    setRecipesFiltered,
  }), [recipes, recipesFiltered]);

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
