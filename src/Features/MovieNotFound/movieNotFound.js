import { ContentSection } from '../../AppCore/app_style';
import { MovieNotFoundTitle } from './movieNotFound_style';
import { Link } from 'react-router-dom';
import { BASE_PATH } from '../../AppCore/AppContent/common/constants';

/**
 * Renders a simple informative message that the movie details where not found
 * and since it's rendered ony on mobile view a Link that redirects you
 * to the movielist view
 * @returns {JSX.Element}
 * @constructor
 */
const MovieNotFound = () => (
  <ContentSection>
    <MovieNotFoundTitle>
      These are not the details you are searching for!
    </MovieNotFoundTitle>
    <p>
      <span>
        Seems that the movie details you are searching are not available. Please
        feel free to select a Movie from our
      </span>{' '}
      <Link to={BASE_PATH}>MovieList</Link>
    </p>
  </ContentSection>
);

export default MovieNotFound;
