import api from 'api';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import FormBuilder from '@components/form-builder/FormBuilder';
import useManagers from '@components/manager/@hooks/useManagers';
import toString from '@libs/toString';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { appendProject, updateProject } from '@redux/actions';

import { ProjectProps } from '../@types';

type Optional<T, K extends string | number | symbol> = {
  [P in Exclude<keyof T, K>]?: T[P];
};

export type AddProjectFormProps = Optional<ProjectProps, 'developers'> & {
  onClose?: () => void;
  formType: '__ADD_FORM__' | '__EDIT_FORM__';
};

type AddProjectFormState = {
  project: Omit<ProjectProps, '_id' | 'developers'>;
  error: any;
  isPending: boolean;
};

export default function AddProjectForm({
  onClose,
  formType,
  ...initialProject
}: AddProjectFormProps) {
  const dispatch = useDispatch();
  const managers = useManagers();
  const history = useHistory();

  const [
    { project, error, isPending },
    setState,
  ] = React.useState<AddProjectFormState>({
    project: {
      managerId: initialProject.managerId || managers[0]._id,
      name: initialProject.name || '',
      description: initialProject.description || '',
      fields: initialProject.fields || [],
    },
    error: null,
    isPending: false,
  });

  const handleChange = (key: string) => (event: React.ChangeEvent<any>) => {
    setState((state) => ({
      ...state,
      project: {
        ...state.project,
        [key]: event.target.value,
      },
    }));
  };

  const handleXFChange = (idx: number) => (event: React.ChangeEvent<any>) => {
    setState((state) => {
      const project = { ...state.project };
      const field = project.fields[idx];
      field.value = event.target.value;
      return { ...state, project };
    });
  };

  const handleCreateProject = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isPending) return;
    setState((state) => ({
      ...state,
      isPending: true,
      error: null,
    }));

    if (formType === '__ADD_FORM__') {
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
        setState((state) => ({
          ...state,
          isPending: false,
          error,
        }));
      }
    } else {
      api
        .put(`/projects/${initialProject._id}`, {
          ...project,
        })
        .then(({ data: { error, data } }) => {
          if (error) throw error;

          dispatch(updateProject(data));
        })
        .catch((error) => {
          setState((state) => ({
            ...state,
            isPending: false,
            error,
          }));
        });
    }
  };

  const [isBuilderOpen, setIsBuilderOpen] = React.useState(false);

  const toggleBuilderOpen = () => {
    setIsBuilderOpen((isBuilderOpen) => !isBuilderOpen);
  };

  const onCreate = (builderProps: {
    name: string;
    value: string;
    isRequired: boolean;
  }) => {
    setState((state) => ({
      ...state,
      project: {
        ...state.project,
        fields: [...state.project.fields, { ...builderProps, value: '' }],
      },
    }));
  };

  return (
    <Box>
      {Boolean(error) && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {toString(error.error || error.message || error)}
        </Alert>
      )}

      <Box sx={{ marginTop: 3 }}>
        {isBuilderOpen ? (
          <Box sx={{ marginTop: 1 }}>
            <FormBuilder onCreate={onCreate} />
            <Box sx={{ marginTop: 1 }}>
              <Button variant="contained" onClick={toggleBuilderOpen}>
                Close
              </Button>
            </Box>
          </Box>
        ) : (
          <Button variant="contained" onClick={toggleBuilderOpen}>
            Add field
          </Button>
        )}
      </Box>

      <Box sx={{ marginTop: 3 }}>
        <div>
          <form onSubmit={handleCreateProject}>
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

            {project.fields.map((field, idx) => (
              <TextField
                key={idx}
                margin="dense"
                label={field.name}
                type="text"
                fullWidth
                variant="standard"
                value={field.value}
                onChange={handleXFChange(idx)}
                required={field.isRequired}
              />
            ))}

            <Box sx={{ '& > *': { m: 1 }, marginTop: 2 }}>
              <LoadingButton
                pending={isPending}
                variant="contained"
                type="submit"
              >
                {formType === '__ADD_FORM__' ? 'Create' : 'Save'}
              </LoadingButton>
            </Box>
          </form>
        </div>
      </Box>
    </Box>
  );
}
