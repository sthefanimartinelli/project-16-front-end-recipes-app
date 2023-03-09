// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';

// function RecipeDetails() {
//   const [details, setDetails] = useState([]);
//   const location = useLocation();
//   const { pathname } = location;

//   const id = pathname.split('/')[2];

//   const fetchRecipe = async () => {
//     if (pathname.includes('/meals')) {
//       const responseDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
//       const dataDetails = await responseDetails.json().meals;
//       setDetails(dataDetails);
//     }
//   };

//   return (
//     <h1>{ id }</h1>
//   );
// }

// export default RecipeDetails;
