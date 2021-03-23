import api from 'api';
import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { appendManager } from '@redux/actions';

export type AddManagerFormProps = {
  onClose: () => void;
};

export default function AddManagerForm({ onClose }: AddManagerFormProps) {
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
  };

  const [{ name }, setManager] = React.useState({
    name: '',
  });

  const handleChange = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setManager((manager) => ({
      ...manager,
      [key]: event.target.value,
    }));
  };

  const handleCreate = async () => {
    try {
      const {
        data: { error, data },
      } = await api.post('/managers', { name });
      if (error) throw error;

      dispatch(appendManager(data));

      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DialogTitle id="сreate-manager-dialog-title">
        Create a unit manager
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Unit managers will act as root elements, they will have nested
          projects, within which there will be developers.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={handleChange('name')}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton onClick={handleCreate}>Create</LoadingButton>
      </DialogActions>
    </>
  );
}
