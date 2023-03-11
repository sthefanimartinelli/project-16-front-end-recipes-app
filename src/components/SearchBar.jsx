import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { searchMealsAPI } from '../services/searchMealsAPI';
import { searchDrinksAPI } from '../services/searchDrinksAPI';

function SearchBar() {
  const TO_THIS_INDEX = 12;
  const history = useHistory();
  const [searchValue, setSearch] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const handleChange = ({ target: { value } }) => {
    setRadioValue(value);
  };
  const handleClick = async () => {
    try {
      if (history.location.pathname === '/meals') {
        const result = await searchMealsAPI(radioValue, searchValue);
        if (result.meals.length === 1) {
          history.push(`/meals/${result.meals[0].idMeal}`);
        } else {
          setDataMeals(result.meals);
        }
      } else if (history.location.pathname === '/drinks') {
        const result = await searchDrinksAPI(radioValue, searchValue);
        if (result.drinks.length === 1) {
          history.push(`/drinks/${result.drinks[0].idDrink}`);
        } else {
          setDataDrinks(result.drinks);
        }
      }
    } catch (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };
  return (
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
      {dataMeals
        && dataMeals.slice(0, TO_THIS_INDEX)
          .map(({ strMeal, strMealThumb }, index) => (
            <div
              key={ strMeal }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                style={ { width: '100px' } }
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt={ strMeal }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {strMeal}
              </p>
            </div>
          ))}
      {dataDrinks
        && dataDrinks.slice(0, TO_THIS_INDEX)
          .map(({ strDrink, strDrinkThumb }, index) => (
            <div
              key={ strDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt={ strDrink }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {strDrink}
              </p>
            </div>
          ))}
    </div>
  );
}
export default SearchBar;
