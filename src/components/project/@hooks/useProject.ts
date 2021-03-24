import React from 'react';

import useProjects from './useProjects';

export default function useProject(projectId: string) {
  const projects = useProjects();

  return React.useMemo(() => {
    return projects.find((p) => p._id === projectId);
  }, [projectId, projects]);
}
