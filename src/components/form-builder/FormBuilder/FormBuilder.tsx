import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export type BuilderProps = {
  name: string;
  value: string;
  isRequired: boolean;
};

export type FormBuilderProps = {
  onCreate: (props: BuilderProps) => void;
};

export default function FormBuilder({ onCreate }: FormBuilderProps) {
  const [builderProps, setBulderProps] = React.useState<BuilderProps>({
    name: '',
    value: '',
    isRequired: false,
  });

  const handleBulderChange = (key: string) => ({
    target,
  }: React.ChangeEvent<any>) => {
    setBulderProps((builderProps) => ({
      ...builderProps,
      [key]: key === 'isRequired' ? target.checked : target.value,
    }));
  };

  const handleCreateField = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate?.(builderProps);
  };

  return (
    <div>
      <form onSubmit={handleCreateField}>
        <div>
          <TextField
            type="text"
            label="Field name"
            value={builderProps.name}
            onChange={handleBulderChange('name')}
          />
        </div>
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={builderProps.isRequired}
                onChange={handleBulderChange('isRequired')}
                color="primary"
              />
            }
            label="Is required?"
          />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
