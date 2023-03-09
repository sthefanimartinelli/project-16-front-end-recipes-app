import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import pageTitle from '../helpers/pageTitle';

function Header() {
  const location = useLocation();

  const history = useHistory();
  const [titleOfPage, setTitleOfPage] = useState('');
  const [searchBtn, setSearchBtn] = useState(false);

  useEffect(() => {
    setTitleOfPage(pageTitle(location.pathname));
  }, [location]);

  return (
    <div>
      <h1
        data-testid="page-title"
      >
        { titleOfPage }
      </h1>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
        onClick={ () => history.push('./profile') }
      >
        <img src={ profileIcon } alt="ícone de perfil" />
      </button>
      { (location.pathname === '/meals' || location.pathname === '/drinks')
      && (
        <button
          type="button"
          data-testid="search-top-btn"
          src={ searchIcon }
          onClick={ () => setSearchBtn(!searchBtn) }
        >
          <img src={ searchIcon } alt="ícone de pesquisa" />
        </button>) }
      { searchBtn && <SearchBar /> }
    </div>
  );
}

export default Header;
