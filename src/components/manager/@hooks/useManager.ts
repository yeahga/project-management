import React from 'react';

import useManagers from './useManagers';

export default function useManager(managerId: string) {
  const managers = useManagers();

  return React.useMemo(() => {
    return managers.find((m) => m._id === managerId);
  }, [managerId, managers]);
}
