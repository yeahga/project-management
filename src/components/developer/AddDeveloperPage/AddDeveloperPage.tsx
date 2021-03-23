import React from 'react';

import Box from '@material-ui/core/Box';

import AddDeveloperForm from '../AddDeveloperForm';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function AddDeveloperPage() {
  const query = useQuery();
  const projectId = query.get('projectId');

  return (
    <Box sx={{ width: '100%', marginTop: 3 }}>
      <div>
        <AddDeveloperForm projectId={projectId} />
      </div>
    </Box>
  );
}
