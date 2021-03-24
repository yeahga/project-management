import React from 'react';

import useQuery from '@hooks/useQuery';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import AddDeveloperForm from '../AddDeveloperForm';

export default function AddDeveloperPage() {
  const query = useQuery();
  const projectId = query.get('projectId');

  return (
    <Box sx={{ width: '100%', marginTop: 1 }}>
      <div>
        <Typography variant="h4" gutterBottom component="div">
          Create a developer
        </Typography>
        <Box sx={{ marginTop: 3 }}>
          <AddDeveloperForm projectId={projectId} />
        </Box>
      </div>
    </Box>
  );
}
