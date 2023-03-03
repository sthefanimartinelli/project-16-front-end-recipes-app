import PropTypes from 'prop-types';
import { useMemo } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const context = useMemo(() => ({
    oi: 'oi',
  }), []);

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
