import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { searchMealsAPI } from '../services/searchMealsAPI';
import { searchDrinksAPI } from '../services/searchDrinksAPI';
import RecipesContext from '../context/RecipesContext';

function SearchBar() { // alterado
  const history = useHistory();
  const [searchValue, setSearch] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const { setRecipesFiltered } = useContext(RecipesContext);
  const handleChange = ({ target: { value } }) => {
    setRadioValue(value);
  };
  const handleClick = async () => { // alterado
    if (history.location.pathname === '/meals') {
      const result = await searchMealsAPI(radioValue, searchValue);
      if (result.meals === null) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      setRecipesFiltered(result.meals);
      if (result.meals.length === 1) {
        history.push(`/meals/${result.meals[0].idMeal}`);
      }
    } else {
      const result = await searchDrinksAPI(radioValue, searchValue);
      if (result.drinks === null) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      setRecipesFiltered(result.drinks);
      if (result.drinks.length === 1) {
        console.log('detalhe');
        console.log('oi');
        history.push(`/drinks/${result.drinks[0].idDrink}`);
      }
    }
  };
  return (// alterado
    <div>
      <form>
        <input
          value={ searchValue }
          placeholder="Search"
          data-testid="search-input"
          onChange={ (e) => setSearch(e.target.value) }
        />
        <input
          value="Ingredient"
          name="search"
          data-testid="ingredient-search-radio"
          type="radio"
          onChange={ handleChange }
        />
        Igredients
        <input
          value="Name"
          name="search"
          data-testid="name-search-radio"
          type="radio"
          onChange={ handleChange }
        />
        Name
        <input
          value="First letter"
          name="search"
          data-testid="first-letter-search-radio"
          type="radio"
          onChange={ handleChange }
        />
        First Letter
      </form>
      <button
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>
  );
}
export default SearchBar;
