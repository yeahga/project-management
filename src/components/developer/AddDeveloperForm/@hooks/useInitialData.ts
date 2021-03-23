import lscache from 'lscache';
import React from 'react';

import { ADD_DEV_FORM_DATA_CACHE_KEY } from '@components/developer/@constants';
import { DeveloperProps } from '@components/developer/@types';
import { initialDeveloper } from '@components/developer/initialDeveloper';

export type InitialData = Omit<DeveloperProps, '_id'>;

export default function useInitialData(projectId: string): InitialData {
  return React.useMemo(() => {
    const cachedData = lscache.get(ADD_DEV_FORM_DATA_CACHE_KEY);

    return cachedData
      ? { ...cachedData, projectId } // avoid getting projectId from cache
      : { ...initialDeveloper, projectId };
  }, [projectId]);
}
