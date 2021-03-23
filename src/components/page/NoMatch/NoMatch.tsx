import React from 'react';

import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import Box from '@material-ui/core/Box';

export default function NoMatch() {
  return (
    <Box>
      <Alert severity="error">
        <AlertTitle>404</AlertTitle>
        Page not found
      </Alert>
    </Box>
  );
}
