import api from 'api';
import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { appendProject } from '@redux/actions';

export type AddProjectFormProps = {
  managerId: string;
  onClose: () => void;
};

export default function AddProjectForm({
  managerId,
  onClose,
}: AddProjectFormProps) {
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
  };

  const [{ name, description }, setProject] = React.useState({
    name: '',
    description: '',
  });

  const handleChange = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProject((project) => ({
      ...project,
      [key]: event.target.value,
    }));
  };

  const handleCreate = async () => {
    try {
      const {
        data: { error, data },
      } = await api.post('/projects', { name, description, managerId });
      if (error) throw error;

      dispatch(appendProject(data));

      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DialogTitle id="сreate-project-dialog-title">
        Create a project
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
          value={name}
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
          value={description}
          onChange={handleChange('description')}
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton onClick={handleCreate}>Create</LoadingButton>
      </DialogActions>
    </>
  );
}
