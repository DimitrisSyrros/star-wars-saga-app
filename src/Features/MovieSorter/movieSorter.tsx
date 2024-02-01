import { SortBySelect } from './movieSorter_style';
import React, { useContext } from 'react';
import { StoreContext, StoreType } from '../../AppCore/Store/store';
import PropTypes from 'prop-types';

type MovieSorter = {
  disabled: boolean;
};
/**
 * A simple select that provides filtering options for the user to filter
 * the movielist by
 * @param disabled  {Boolean} indicates when the sort by should be disabled
 * @returns {JSX.Element}
 * @constructor
 */
const MovieSorter = ({ disabled }: MovieSorter): React.JSX.Element => {
  const { handleSort } = useContext(StoreContext) as StoreType;
  return (
    <SortBySelect
      defaultValue=""
      disabled={disabled}
      onChange={(e) => handleSort(e.target.value)}
    >
      <option value="" disabled hidden>
        Sort movies...
      </option>
      <option value="year-asc">Year Ascending</option>
      <option value="year-desc">Year Descending</option>
      <option value="episode-asc">Episode Ascending</option>
      <option value="episode-desc">Episode Descending</option>
      <option value="rating-asc">Rating Ascending</option>
      <option value="rating-desc">Rating Descending</option>
    </SortBySelect>
  );
};

MovieSorter.propTypes = {
  disabled: PropTypes.bool,
};
export default MovieSorter;
