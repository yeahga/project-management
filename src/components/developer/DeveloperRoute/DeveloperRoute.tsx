import React from 'react';

import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';

import useDeveloper from '../@hooks/useDeveloper';
import useDeveloperId from '../@hooks/useDeveloperId';
import ViewDeveloper from '../ViewDeveloper';

export default function DeveloperRoute() {
  const developerId = useDeveloperId();
  const developer = useDeveloper(developerId);

  if (!developer) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Developer not found
      </Alert>
    );
  }

  return <ViewDeveloper developer={developer} />;
}
