import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesList from '../components/RecipesList';

export default function Meals() {
  return (
    <div>
      <Header />
      <Recipes />
      <RecipesList />
      <Footer />
    </div>
  );
}
