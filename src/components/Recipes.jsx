import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

const LIMITS = 5;
function Recipes() {
  const { setRecipesFiltered, allRecipes } = useContext(RecipesContext);// alterada
  const location = useLocation();
  const [categories, setCategory] = useState([]);
  const [chosenFilter, setChosenFilter] = useState('');
  const categoryMeals = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
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
    } else {
      categoryDrinks();
    }
  };
  useEffect(() => {
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
  const filterSelect = (category) => {
    if (chosenFilter === category.strCategory) {
      console.log('ooi');
      applyFilterMeals(category.strCategory);
      setRecipesFiltered(allRecipes);// alterada
    } else if (location.pathname === '/meals') {
      setChosenFilter(category.strCategory);
      applyFilterMeals(category.strCategory);
    } else {
      applyFilterDrinks(category.strCategory);
      setChosenFilter(category.strCategory);
      console.log('oi2');
    }
  };
  return (
    <div>
      <button
        data-testid="All-category-filter"
        onClick={ () => setRecipesFiltered(allRecipes) }// alteradass
      >
        All
      </button>
      {categories?.slice(0, LIMITS).map((category, i) => (
        <button
          type="button"
          key={ i }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => filterSelect(category) }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}
export default Recipes;
