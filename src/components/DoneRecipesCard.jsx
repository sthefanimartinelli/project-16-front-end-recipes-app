import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DoneRecipeCard(props) {
  const { name, index, alcoholicOrNot, image, category, handleShareClick, doneDate, id,
    nationality, type, tags } = props;
  const Currentpath = window.location.href.replace('/done-recipes', '');
  const detailsPathLink = `/${type}s/${id}`;
  const detailpath = `${Currentpath}/${type}s/${id}`;
  return (
    <div>
      <button
        type="button"
        onClick={ () => handleShareClick(detailpath) }
        data-testid={ `${index}-horizontal-share-btn` }
        src="shareIcon"
      >
        <img
          src="shareIcon"
          alt="compartilhar"
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
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      <ul>
        {tags.slice(0, 2).map((tag) => (
          <li
            data-testid={ `${index}-${tag}-horizontal-tag` }
            key={ `${index}${tag}` }
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
DoneRecipeCard.propTypes = {
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleShareClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
};
export default DoneRecipeCard;
