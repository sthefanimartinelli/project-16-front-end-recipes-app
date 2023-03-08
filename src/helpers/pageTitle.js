export default function pageTitle(urlPath) {
  switch (urlPath) {
  case '/meals':
    return 'Meals';
  case '/drinks':
    return 'Drinks';
  case '/profile':
    return 'Profile';
  case '/done-recipes':
    return 'Done Recipes';
  case '/favorite-recipes':
    return 'Favorite Recipes';
  default:
    break;
  }
}
