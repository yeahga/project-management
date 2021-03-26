import React from 'react';

import useQuery from '@hooks/useQuery';
import Box from '@material-ui/core/Box';

import AddProjectForm from '../AddProjectForm';
import Typography from '@material-ui/core/Typography';

export default function AddProjectPage() {
  const query = useQuery();
  const managerId = query.get('managerId') || '';

  return (
    <Box sx={{ width: '100%', marginTop: 1 }}>
      <div>
        <Typography variant="h4" gutterBottom component="div">
          Create a project
        </Typography>
        <Box sx={{ marginTop: 3 }}>
          <AddProjectForm managerId={managerId} formType="__ADD_FORM__" />
        </Box>
      </div>
    </Box>
  );
}
