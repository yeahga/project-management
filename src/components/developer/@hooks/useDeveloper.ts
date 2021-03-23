import React from 'react';

import useDevelopers from './useDevelopers';

export default function useDeveloper(developerId: string) {
  const developers = useDevelopers();

  return React.useMemo(() => {
    return developers.find((d) => d._id === developerId);
  }, [developerId, developers]);
}
