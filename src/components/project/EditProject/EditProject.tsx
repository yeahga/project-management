import api from 'api';
import React from 'react';
import { useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { updateProject } from '@redux/actions';

import { ProjectProps } from '../@types';

export type EditProjectProps = { project: ProjectProps };

export default function EditProject({
  project: initialProject,
}: EditProjectProps) {
  const dispatch = useDispatch();

  const [project, setProject] = React.useState(initialProject);

  const handleChange = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProject((project: any) => ({
      ...project,
      [key]: event.target.value,
    }));
  };

  const handleSublit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    api
      .patch(`/projects/${project._id}`, {
        ...project,
      })
      .then(({ data: { error, data } }) => {
        if (error) throw error;

        dispatch(updateProject(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ width: '100%', marginTop: 3 }}>
      <div>
        <form onSubmit={handleSublit}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={project.name || ''}
            onChange={handleChange('name')}
            required
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={project.description || ''}
            onChange={handleChange('description')}
            multiline
          />
          <LoadingButton type="submit">Save</LoadingButton>
        </form>
      </div>
    </Box>
  );
}
