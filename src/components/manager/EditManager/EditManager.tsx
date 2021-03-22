import api from 'api';
import React from 'react';
import { useDispatch } from 'react-redux';

import useCurrent from '@hooks/useCurrent';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { updateManager } from '@redux/actions';

export default function EditManager() {
  const dispatch = useDispatch();

  const { current: initialManager } = useCurrent();

  const [manager, setManager] = React.useState(initialManager);

  const handleChange = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setManager((manager: any) => ({
      ...manager,
      [key]: event.target.value,
    }));
  };

  const handleSublit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    api
      .patch(`/managers/${manager._id}`, {
        ...manager,
      })
      .then(({ data: { error, data } }) => {
        if (error) throw error;
        dispatch(updateManager(data));
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
            value={manager.name}
            onChange={handleChange('name')}
            required
          />
          <LoadingButton type="submit">Save</LoadingButton>
        </form>
      </div>
    </Box>
  );
}
