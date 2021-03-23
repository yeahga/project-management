import React from 'react';

import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';

import useProject from '../@hooks/useProject';
import useProjectId from '../@hooks/useProjectId';
import ViewProject from '../ViewProject';

export default function ProjectRoute() {
  const projectId = useProjectId();
  const project = useProject(projectId);

  if (!project) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Project not found
      </Alert>
    );
  }

  return <ViewProject project={project} />;
}
