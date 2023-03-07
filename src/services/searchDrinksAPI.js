export const searchDrinksAPI = async (radioValue, searchValue) => {
  let response;
  let data;
  if (radioValue === 'First letter' && searchValue.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  }
  switch (radioValue) {
  case 'Ingredient':
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue}`);
    data = await response.json();
    return data;
  case 'Name':
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`);
    data = await response.json();
    return data;
  case 'First letter':
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchValue}`);
    data = await response.json();
    return data;
  default:
    break;
  }
};
