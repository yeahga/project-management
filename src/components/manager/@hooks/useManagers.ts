import React from 'react';

import useState from '@hooks/useState';

export default function useManagers() {
  const { managers } = useState();

  return React.useMemo(() => {
    return managers;
  }, [managers]);
}
