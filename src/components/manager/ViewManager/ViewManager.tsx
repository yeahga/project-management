import api from 'api';
import React from 'react';
import { useDispatch } from 'react-redux';

import ProjectsTable from '@components/project/ProjectsTable';
import useCurrent from '@hooks/useCurrent';
import capitalize from '@libs/capitalize';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { setCurrentlyEditingID } from '@redux/actions';

import EditManager from '../EditManager';

const AddProjectDialog = React.lazy(
  () => import('@components/project/AddProjectDialog')
);

export default function ViewManager() {
  const dispatch = useDispatch();

  const {
    current: manager,
    current: { _id, projects },
    currentlyEditingID,
  } = useCurrent();

  const isEditing = React.useMemo(() => {
    return currentlyEditingID === _id;
  }, [_id, currentlyEditingID]);

  const handleToggle = () => {
    const id = isEditing ? null : _id;
    dispatch(setCurrentlyEditingID(id));
  };

  const handleDelete = () => {
    const conf = confirm('Are you sure you want to delete this manager?');
    if (!conf) return;
    api
      .delete(`/managers/${_id}`)
      .then(({ data: { error } }) => {
        if (error) throw error;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Box
        sx={{
          '& button': {
            m: 1,
          },
        }}
      >
        <div>
          <Button variant="contained" onClick={handleToggle}>
            {isEditing ? 'Cancel edit' : 'Edit Manager'}
          </Button>
          <Button variant="contained" onClick={handleOpen}>
            Add Project
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Delete Manager
          </Button>
        </div>
      </Box>

      {isEditing ? (
        <EditManager />
      ) : (
        <Box sx={{ width: '100%', marginTop: 3 }}>
          {Object.entries(manager).map(
            ([key, val], idx) =>
              !['__v', '_id', 'type', 'projects'].includes(key) && (
                <Typography key={idx} variant="h6" gutterBottom component="div">
                  {capitalize(key)}: {val}
                </Typography>
              )
          )}
          {Boolean(projects?.length) && (
            <div>
              <Typography variant="h6" gutterBottom component="div">
                Project list:{' '}
              </Typography>
              <ProjectsTable projects={projects} />
            </div>
          )}
        </Box>
      )}

      <React.Suspense fallback={null}>
        <AddProjectDialog
          managerId={_id}
          isOpen={isOpen}
          onClose={handleClose}
        />
      </React.Suspense>
    </div>
  );
}
