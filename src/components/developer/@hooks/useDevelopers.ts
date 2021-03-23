import React from 'react';

import useProjects from '@components/project/@hooks/useProjects';

export default function useDevelopers() {
  const projects = useProjects();

  return React.useMemo(() => {
    return projects.flatMap((p) => p.developers || []);
  }, [projects]);
}
