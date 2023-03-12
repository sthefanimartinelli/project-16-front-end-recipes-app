export const goToStartRecipe = (pathname, history) => {
  const category = pathname.split('/')[1];
  const id = pathname.split('/')[2];
  if (category.includes('meals')) {
    history.push(`/meals/${id}/in-progress`);
  } else {
    history.push(`/drinks/${id}/in-progress`);
  }
};
