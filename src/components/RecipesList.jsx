import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

export default function RecipesList() {
  const { recipes, stateApi, setRecipes, recipesFiltered } = useContext(RecipesContext);
  const history = useHistory();
  const maxNumber = 12;
  // verificar se há uma única receita disponível na lista de receitas e, em caso afirmativo, redirecionar o usuário para a página de detalhes dessa receita. Caso contrário, um alerta é exibido informando que nenhuma receita foi encontrada.
  const verifyLength = () => {
    if (stateApi === 'food') {
      if (recipes?.length === 1) {
        history.push(`/meals/${recipes[0].idMeal}`);
      } else if (recipes?.length === 0) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    } else if (stateApi !== 'food') {
      if (recipes?.length === 1) {
        history.push(`/drinks/${recipes[0].idDrink}`);
      } else if (recipes?.length === 0) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  };
  // para buscar receitas de comida ou bebida da API dependendo do valor da variável stateApi e atualizar o estado das receitas do componente.
  useEffect(() => {
    const fetchFoods = async () => {
      if (stateApi === 'food') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecipes(data.meals);
      } else {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecipes(data.drinks);
      }
      verifyLength();
    };
    fetchFoods();
  }, [stateApi]);
  return (
    <div>
      {
        stateApi === 'food'
          ? (recipesFiltered.length > 0 ? recipesFiltered : recipes)
            ?.slice(0, maxNumber)
            .map((recipe, i) => (
              <div data-testid={ `${i}-recipe-card` } key={ recipe.idMeal }>
                <p data-testid={ `${i}-card-name` }>{recipe.strMeal}</p>
                <img
                  data-testid={ `${i}-card-img` }
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                />
              </div>
            ))
          : (recipesFiltered.length > 0 ? recipesFiltered : recipes)
            ?.slice(0, maxNumber)
            .map((recipe, i) => (
              <div data-testid={ `${i}-recipe-card` } key={ recipe.idDrink }>
                <p data-testid={ `${i}-card-name` }>{recipe.strDrink}</p>
                <img
                  data-testid={ `${i}-card-img` }
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                />
              </div>
            ))
      }
    </div>
  );
}
