export const fecthRecomendation = async (pathname, setRecomendation) => {
  if (pathname.includes('meals')) {
    const responseDetails = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const dataDetails = await responseDetails.json();
    setRecomendation(dataDetails.drinks);
  } else {
    const responseDetails = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const dataDetails = await responseDetails.json();
    setRecomendation(dataDetails.meals);
  }
};

const fecthAPI = async (id, mealOrDrink) => {
  if (mealOrDrink === 'meals') {
    const responseDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const dataDetails = await responseDetails.json();
    return dataDetails[mealOrDrink][0];
  } if (mealOrDrink === 'drinks') {
    const responseDetails = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const dataDetails = await responseDetails.json();
    return dataDetails[mealOrDrink][0];
  }
};

export const treatAPIdata = async (pathname, setState) => {
  const id = pathname.split('/')[2];
  const mealOrDrink = pathname.includes('meals') ? 'meals' : 'drinks';
  const type = pathname.includes('meals') ? 'meal' : 'drink';
  const thumb = mealOrDrink.includes('meals') ? 'strMealThumb' : 'strDrinkThumb';
  const name = mealOrDrink.includes('meals') ? 'strMeal' : 'strDrink';
  const category = 'strCategory';
  const alcoholicOrNot = 'strAlcoholic';

  const infoDetails = await fecthAPI(id, mealOrDrink);

  const ingredientsObject = Object.fromEntries(Object.entries(infoDetails)
    .filter(([key]) => key.includes('strIngredient')));

  const ingredientsList = Object.values(ingredientsObject)
    .filter((value) => value !== null && value !== '');

  const measuresObject = Object.fromEntries(Object.entries(infoDetails)
    .filter(([key]) => key.includes('strMeasure')));

  const measuresList = Object.values(measuresObject);

  const ingredientsNMeasures = ingredientsList.map((item, index) => ({
    ingredient: item,
    measure: measuresList[index],
  }));

  const youtube = infoDetails.strYoutube
    ? infoDetails.strYoutube.replace('watch?v=', 'embed/') : undefined;

  const recipeInfo = ({
    id,
    type,
    mealOrDrink,
    thumb: infoDetails[thumb],
    name: infoDetails[name],
    category: infoDetails[category] ? infoDetails[category] : '',
    alcoholicOrNot: infoDetails[alcoholicOrNot] ? infoDetails[alcoholicOrNot] : '',
    ingredients: ingredientsNMeasures,
    youtube,
    nationality: infoDetails.strArea ? infoDetails.strArea : '',
    instructions: infoDetails.strInstructions,
    tags: infoDetails.strTags ? infoDetails.strTags : '',
  });

  setState(recipeInfo);
};
