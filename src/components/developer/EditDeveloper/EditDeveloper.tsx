import api from 'api';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';

import { updateDeveloper } from '@redux/actions';

import type { State } from '@redux/reducers/treeReducer';
import Box from '@material-ui/core/Box';

export default function EditDeveloper() {
  const dispatch = useDispatch();

  const initialDeveloper = useSelector(
    ({ state }: { state: State }) => state.current
  );

  const projects = useSelector(({ state }: { state: State }) =>
    state.managers.flatMap((m) => m.projects)
  );

  const [developer, setDeveloper] = React.useState(initialDeveloper);

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

    api
      .patch(`/developers/${developer._id}`, {
        ...developer,
      })
      .then(({ data: { error, data } }) => {
        if (error) throw error;

        dispatch(updateDeveloper(data));
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
            <InputLabel htmlFor="uncontrolled-native">Project</InputLabel>
            <NativeSelect
              name="projectId"
              value={developer.projectId}
              onChange={handleChange('projectId')}
            >
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <LoadingButton type="submit">Save</LoadingButton>
        </form>
      </div>
    </Box>
  );
}
