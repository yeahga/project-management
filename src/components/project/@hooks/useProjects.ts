import React from 'react';

import useState from '@hooks/useState';

export default function useProjects() {
  const { managers } = useState();

  return React.useMemo(() => {
    return managers.flatMap((m) => m.projects || []);
  }, [managers]);
}
