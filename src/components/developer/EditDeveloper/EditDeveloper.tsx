import api from 'api';
import React from 'react';
import { useDispatch } from 'react-redux';
import toString from '@libs/toString';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import useProjects from '@components/project/@hooks/useProjects';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { updateDeveloper } from '@redux/actions';

import { DeveloperProps } from '../@types';

export type EditDeveloperProps = { developer: DeveloperProps };

export default function EditDeveloper({
  developer: initialDeveloper,
}: EditDeveloperProps) {
  const dispatch = useDispatch();
  const projects = useProjects();

  const [developer, setDeveloper] = React.useState(initialDeveloper);
  const [error, setError] = React.useState<any>(null);
  const [isPending, setIsPending] = React.useState<any>(false);

  const handleChange = (key: string) => (
    event: any /* React.ChangeEvent<HTMLInputElement> */
  ) => {
    setDeveloper((developer: any) => ({
      ...developer,
      [key]: event.target.value,
    }));
  };

  const handleSublit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isPending) return;
    setIsPending(true);

    setError(null);

    api
      .put(`/developers/${developer._id}`, {
        ...developer,
      })
      .then(({ data: { error, data } }) => {
        if (error) throw error;

        dispatch(updateDeveloper(data));
      })
      .catch((error) => {
        setError(error);
        setIsPending(false);
      });
  };

  return (
    <Box sx={{ width: '100%', marginTop: 3 }}>
      {Boolean(error) && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {toString(error.error || error.message || error)}
        </Alert>
      )}
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
            value={developer.name}
            onChange={handleChange('name')}
            required
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            value={developer.email}
            onChange={handleChange('email')}
            required
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
            value={developer.phone}
            onChange={handleChange('phone')}
          />
          <TextField
            margin="dense"
            id="position"
            label="Position"
            type="text"
            fullWidth
            variant="standard"
            value={developer.position}
            onChange={handleChange('position')}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="select-project">Project</InputLabel>
            <NativeSelect
              id="select-project"
              name="projectId"
              value={developer.projectId}
              onChange={handleChange('projectId')}
            >
              {projects.map(({ _id, name }) => (
                <option key={_id} value={_id}>
                  {name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <Box
            sx={{
              '& > *': {
                m: 1,
              },
              marginTop: 2,
            }}
          >
            <LoadingButton
              pending={isPending}
              variant="contained"
              type="submit"
            >
              Save
            </LoadingButton>
          </Box>
        </form>
      </div>
    </Box>
  );
}
