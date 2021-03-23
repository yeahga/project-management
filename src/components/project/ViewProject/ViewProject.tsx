import api from 'api';
import React from 'react';
import { useDispatch } from 'react-redux';

import DevelopersTable from '@components/developer/DevelopersTable';
import useCurrentlyEditingID from '@hooks/useCurrentlyEditingID';
import capitalize from '@libs/capitalize';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { setCurrentlyEditingID } from '@redux/actions';

import { ProjectProps } from '../@types';
import EditProject from '../EditProject';

const AddDeveloperDialog = React.lazy(
  () => import('@components/developer/AddDeveloperDialog')
);

export type ViewProjectProps = { project: ProjectProps };

export default function ViewProject({ project }: ViewProjectProps) {
  const dispatch = useDispatch();
  const currentlyEditingID = useCurrentlyEditingID();

  const { _id, developers } = project;

  const isEditing = React.useMemo(() => {
    return currentlyEditingID === _id;
  }, [_id, currentlyEditingID]);

  const handleToggle = () => {
    const id = isEditing ? null : _id;
    dispatch(setCurrentlyEditingID(id));
  };

  const handleDelete = () => {
    const conf = confirm('Are you sure you want to delete this project?');
    if (!conf) return;
    api
      .delete(`/projects/${_id}`)
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
            {isEditing ? 'Cancel Edit' : 'Edit Project'}
          </Button>
          <Button variant="contained" onClick={handleOpen}>
            Add Developer
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Delete Project
          </Button>
        </div>
      </Box>

      {isEditing ? (
        <EditProject project={project} />
      ) : (
        <Box sx={{ width: '100%', marginTop: 3 }}>
          {Object.entries(project).map(
            ([key, val], idx) =>
              !['__v', '_id', 'managerId', 'type', 'developers'].includes(
                key
              ) && (
                <Typography key={idx} variant="h6" gutterBottom component="div">
                  {capitalize(key)}: {val}
                </Typography>
              )
          )}
          {Boolean(developers?.length) && (
            <div>
              <Typography variant="h6" gutterBottom component="div">
                Developer list:{' '}
              </Typography>
              <DevelopersTable developers={developers} />
            </div>
          )}
        </Box>
      )}

      <React.Suspense fallback={null}>
        <AddDeveloperDialog
          projectId={_id}
          isOpen={isOpen}
          onClose={handleClose}
        />
      </React.Suspense>
    </div>
  );
}
