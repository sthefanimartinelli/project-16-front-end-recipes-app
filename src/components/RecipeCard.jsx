import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard(props) {
  const { name, index, alcoholicOrNot, image, category, handleShareClick,
    id, nationality, type } = props;
  const Currentpath = window.location.href.replace('/done-recipes', '');
  const detailsPathLink = `/${type}s/${id}`;
  const detailpath = `${Currentpath}/${type}s/${id}`;

  return (
    <div>
      <button
        type="button"
        onClick={ () => handleShareClick(detailpath) }
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
      >
        <img
          src={ shareIcon }
          alt="compartilhar"
        />
      </button>
      <button
        type="button"
        // onClick={ () => handleFavorite(id) }
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
      >
        <img
          src={ blackHeartIcon }
          alt="desfavoritar"
        />
      </button>
      <Link to={ detailsPathLink }>
        <img
          style={ { width: '100px' } }
          src={ image }
          data-testid={ `${index}-horizontal-image` }
          alt="recipePicture"
        />
      </Link>
      { type === 'meal'
      && (
        <h1 data-testid={ `${index}-horizontal-top-text` }>
          {nationality}
          {' '}
          -
          {' '}
          {category}
        </h1>)}
      { type === 'drink'
      && (
        <h4 data-testid={ `${index}-horizontal-top-text` }>
          {alcoholicOrNot}
        </h4>)}
      <h4 data-testid={ `${index}-horizontal-top-text` }>{ category }</h4>
      <Link to={ detailsPathLink }>
        <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
      </Link>
    </div>
  );
}
DoneRecipeCard.propTypes = {
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleShareClick: PropTypes.func.isRequired,
  // handleFavorite: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
};
export default DoneRecipeCard;
