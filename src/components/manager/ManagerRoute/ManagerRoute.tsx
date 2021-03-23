import React from 'react';

import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';

import useManager from '../@hooks/useManager';
import useManagerId from '../@hooks/useManagerId';
import ViewManager from '../ViewManager';

export default function ManagerRoute() {
  const managerId = useManagerId();
  const manager = useManager(managerId);

  if (!manager) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Manager not found
      </Alert>
    );
  }

  return <ViewManager manager={manager} />;
}
