import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipesList from '../components/RecipesList';

function Drinks() {
  return (
    <div>
      <Header />
      <Recipes />
      <RecipesList />
      <Footer />
    </div>
  );
}

export default Drinks;
