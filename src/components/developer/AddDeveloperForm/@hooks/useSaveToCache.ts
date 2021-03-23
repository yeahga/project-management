import lscache from 'lscache';
import React from 'react';

import {
  ADD_DEV_FORM_DATA_CACHE_KEY,
  ADD_DEV_FORM_DATA_CACHE_LIFETIME,
} from '@components/developer/@constants';
import { DeveloperProps } from '@components/developer/@types';

export type CacheData = Omit<DeveloperProps, '_id'>;

export default function useSaveToCache(__DATA_TO_BE_CACHED__: CacheData): void {
  React.useEffect(() => {
    lscache.set(
      ADD_DEV_FORM_DATA_CACHE_KEY,
      __DATA_TO_BE_CACHED__,
      ADD_DEV_FORM_DATA_CACHE_LIFETIME
    );
  }, [__DATA_TO_BE_CACHED__]);
}
