import api from 'api';
import React from 'react';
import { useDispatch } from 'react-redux';

import useProjects from '@components/project/@hooks/useProjects';
import capitalize from '@libs/capitalize';
import toString from '@libs/toString';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { appendDeveloper } from '@redux/actions';

import useDropCache from './@hooks/useDropCache';
import useInitialData from './@hooks/useInitialData';
import useSaveToCache from './@hooks/useSaveToCache';
import { initialDeveloper } from '../initialDeveloper';

export type AddDeveloperFormProps = {
  projectId?: string | null;
  onClose?: () => void;
};

export default function AddDeveloperForm({
  onClose,
  projectId: initialProjectId,
}: AddDeveloperFormProps) {
  const dispatch = useDispatch();
  const projects = useProjects();
  const initialDev = useInitialData(initialProjectId || projects[0]._id);
  const dropCache = useDropCache();

  const [developer, setDeveloper] = React.useState({ ...initialDev });
  const [error, setError] = React.useState<any>(null);
  const [isPending, setIsPending] = React.useState<any>(false);

  useSaveToCache(developer);

  function reset() {
    setDeveloper({
      ...initialDeveloper,
      projectId: initialProjectId || projects[0]._id,
    });
  }

  const handleChange = (key: string) => (event: React.ChangeEvent<any>) => {
    setDeveloper((developer) => ({
      ...developer,
      [key]: event.target.value,
    }));
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isPending) return;
    setIsPending(true);

    setError(null);

    try {
      const {
        data: { error, data },
      } = await api.post('/developers', { ...developer });

      if (error) throw error;

      dispatch(appendDeveloper(data));

      dropCache();
      (onClose || reset)();
    } catch (error) {
      // TODO: map error codes?
      if (error.code === 11000 && 'keyPattern' in error) {
        setError(
          capitalize(Object.keys(error.keyPattern)[0]) + ' already in use'
        );
      } else {
        setError(error);
      }
    } finally {
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
      <div>
        <form onSubmit={handleCreate}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={developer.name || ''}
            onChange={handleChange('name')}
            required
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={developer.email || ''}
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
            value={developer.phone || ''}
            onChange={handleChange('phone')}
          />
          <TextField
            margin="dense"
            id="position"
            label="Position"
            type="text"
            fullWidth
            variant="standard"
            value={developer.position || ''}
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
              Create
            </LoadingButton>
          </Box>
        </form>
      </div>
    </Box>
  );
}
