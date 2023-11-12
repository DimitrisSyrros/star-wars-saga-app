import { SortBySelect } from './movieSorter_style';
import { useContext } from 'react';
import { StoreContext } from '../../AppCore/Store/store';

const MovieSorter = () => {
  const { handleSort } = useContext(StoreContext);
  return (
    <SortBySelect defaultValue="" onChange={(e) => handleSort(e.target.value)}>
      <option value="" disabled hidden>
        Sort movies...
      </option>
      <option value="year-asc">Year Ascending</option>
      <option value="year-desc">Year Descending</option>
      <option value="episode-asc">Episode Ascending</option>
      <option value="episode-desc">Episode Descending</option>
    </SortBySelect>
  );
};

export default MovieSorter;
