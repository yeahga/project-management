import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { appendDeveloper } from '@redux/actions';
import api from 'api';

export type AddDeveloperFormProps = {
  projectId: string;
  onClose: () => void;
};

export default function AddDeveloperForm({
  projectId,
  onClose,
}: AddDeveloperFormProps) {
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
  };

  const [{ name, email, phone, position }, setDeveloper] = React.useState({
    name: '',
    email: '',
    phone: '',
    position: '',
  });

  const handleChange = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeveloper((developer) => ({
      ...developer,
      [key]: event.target.value,
    }));
  };

  const handleCreate = async () => {
    try {
      const {
        data: { error, data },
      } = await api.post('/developers', {
        projectId,
        name,
        email,
        phone,
        position,
      });
      if (error) throw error;

      dispatch(appendDeveloper(data));

      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DialogTitle id="сreate-developer-dialog-title">
        Create a developer
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={name || ''}
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
          value={email || ''}
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
          value={phone || ''}
          onChange={handleChange('phone')}
        />
        <TextField
          margin="dense"
          id="position"
          label="Position"
          type="text"
          fullWidth
          variant="standard"
          value={position || ''}
          onChange={handleChange('position')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton onClick={handleCreate}>Create</LoadingButton>
      </DialogActions>
    </>
  );
}
