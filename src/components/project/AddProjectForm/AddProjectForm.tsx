import api from 'api';
import React from 'react';
import { useDispatch } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

import toString from '@libs/toString';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { appendProject } from '@redux/actions';
import useManagers from '@components/manager/@hooks/useManagers';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import { useHistory } from 'react-router-dom';

export type AddProjectFormProps = {
  managerId?: string | null;
  onClose?: () => void;
};

export default function AddProjectForm({
  managerId: initialManagerId,
  onClose,
}: AddProjectFormProps) {
  const dispatch = useDispatch();
  const managers = useManagers();
  const history = useHistory();

  const [project, setProject] = React.useState({
    managerId: initialManagerId || managers[0]._id,
    name: '',
    description: '',
  });
  const [error, setError] = React.useState<any>(null);
  const [isPending, setIsPending] = React.useState<any>(false);

  const handleChange = (key: string) => (event: React.ChangeEvent<any>) => {
    setProject((project) => ({
      ...project,
      [key]: event.target.value,
    }));
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isPending) return;
    setIsPending(true);
    setError(false);

    try {
      const {
        data: { error, data },
      } = await api.post('/projects', { ...project });
      if (error) throw error;
      dispatch(appendProject(data));
      onClose instanceof Function
        ? onClose()
        : history.push(`/projects/${data._id}`);
    } catch (error) {
      setError(error);
      setIsPending(false);
    }
  };

  return (
    <Box>
      {Boolean(error) && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {toString(error.error || error.message || error)}
        </Alert>
      )}
      <form onSubmit={handleCreate}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={project.name}
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
          value={project.description}
          onChange={handleChange('description')}
          multiline
        />

        <FormControl fullWidth>
          <InputLabel htmlFor="select-manager">Manager</InputLabel>
          <NativeSelect
            id="select-manager"
            name="managerId"
            value={project.managerId}
            onChange={handleChange('managerId')}
          >
            {managers.map(({ _id, name }) => (
              <option key={_id} value={_id}>
                {name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>

        <Box sx={{ '& > *': { m: 1 }, marginTop: 2 }}>
          <LoadingButton pending={isPending} variant="contained" type="submit">
            Create
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}
