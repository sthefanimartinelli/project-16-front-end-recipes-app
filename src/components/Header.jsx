import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const location = useLocation();

  const history = useHistory();
  const [searchBtn, setSearchBtn] = useState(false);

  const btnStatus = () => {
    if (searchBtn === false) {
      setSearchBtn(true);
    } else {
      setSearchBtn(false);
    }
  };

  // const redirectProfile = () => <Redirect to="/profile" />;

  // Código baseado em https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-title-case-a-sentence/16088
  function capitalCase(string) {
    // Tira o hifen da url
    const removeHyphen = string.replace('-', ' ');
    // Tira a / da url
    const removeSlash = removeHyphen.slice(1);
    // Transforma em upperCase cada primeira letra
    return removeSlash
      .toLowerCase()
      .split(' ')
      .map((word) => word.replace(word.charAt(0), word.charAt(0).toUpperCase()))
      .join(' ');
  }

  return (
    <div>
      <h1
        data-testid="page-title"
      >
        { capitalCase(location.pathname) }
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
          onClick={ btnStatus }
        >
          <img src={ searchIcon } alt="ícone de pesquisa" />
        </button>) }
      { searchBtn === true && <SearchBar /> }
    </div>
  );
}

export default Header;
