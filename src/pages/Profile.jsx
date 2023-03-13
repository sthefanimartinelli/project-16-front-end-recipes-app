import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const emailLogin = JSON.parse(localStorage.getItem('user')) || '';
  console.log(emailLogin);
  const direcionarParaDoneRecipes = () => {
    history.push('/done-recipes');
  };
  const direcionaParaFavorites = () => {
    history.push('/favorite-recipes');
  };
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <div>
      <Header />
      <p data-testid="profile-email">
        { emailLogin !== '' && emailLogin.email }
        {' '}
      </p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ direcionarParaDoneRecipes }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ direcionaParaFavorites }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
export default Profile;
