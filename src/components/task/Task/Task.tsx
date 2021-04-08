import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function Task() {
  return (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <Typography variant="h2" gutterBottom component="div">
        Welcome!
      </Typography>
    </Box>
  );
}
