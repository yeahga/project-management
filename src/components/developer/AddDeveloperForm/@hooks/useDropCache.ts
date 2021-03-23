import lscache from 'lscache';
import React from 'react';

import { ADD_DEV_FORM_DATA_CACHE_KEY } from '@components/developer/@constants';

export default function useDropCache() {
  const dropCache = React.useCallback(function dropCache() {
    lscache.remove(ADD_DEV_FORM_DATA_CACHE_KEY);
  }, []);

  return dropCache;
}
