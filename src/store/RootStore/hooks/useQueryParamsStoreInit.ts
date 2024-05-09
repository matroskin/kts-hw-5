import { useLocation } from 'react-router-dom';

import rootStore from '../instatnce';

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();

  rootStore.query.setSearch(search);
};
