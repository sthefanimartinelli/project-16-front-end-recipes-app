import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

const LIMITS = 5;
function Recipes() {
  const { setRecipesFiltered } = useContext(RecipesContext);
  const location = useLocation();
  const [categories, setCategory] = useState([]);
  const categoryMeals = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    console.log(data);
    setCategory(data.meals);
  };
  const categoryDrinks = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    setCategory(data.drinks);
  };
  const selectCategory = () => {
    if (location.pathname === '/meals') {
      categoryMeals();
    } else if (location.pathname === '/drinks') {
      categoryDrinks();
    }
  };
  useEffect(() => {
    console.log('carreguei');
    selectCategory();
  }, []);
  const applyFilterMeals = async (name) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
    const data = await response.json();
    setRecipesFiltered(data.meals);
  };
  const applyFilterDrinks = async (name) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`);
    const data = await response.json();
    setRecipesFiltered(data.drinks);
  };
  const filterSelect = (name) => {
    if (location.pathname === '/meals') {
      applyFilterMeals(name);
    } else {
      applyFilterDrinks(name);
    }
  };
  return (
    <div>
      <button
        data-testid="All-category-filter"
        onClick={ () => setRecipesFiltered([]) }
      >
        All
      </button>
      {categories.slice(0, LIMITS).map((category, i) => (
        <button
          type="button"
          key={ i }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => filterSelect(category.strCategory) }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}
export default Recipes;
