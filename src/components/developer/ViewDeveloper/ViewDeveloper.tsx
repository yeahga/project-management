import api from 'api';
import React from 'react';
import { useDispatch } from 'react-redux';

import useCurrentlyEditingID from '@hooks/useCurrentlyEditingID';
import capitalize from '@libs/capitalize';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { setCurrentlyEditingID } from '@redux/actions';

import { DeveloperProps } from '../@types';
import EditDeveloper from '../EditDeveloper';

export type ViewDeveloperProps = { developer: DeveloperProps };
export default function ViewDeveloper({ developer }: ViewDeveloperProps) {
  const dispatch = useDispatch();

  const currentlyEditingID = useCurrentlyEditingID();

  const { _id } = developer;

  const isEditing = React.useMemo(() => {
    return currentlyEditingID === _id;
  }, [_id, currentlyEditingID]);

  const handleToggle = () => {
    const id = isEditing ? null : _id;
    dispatch(setCurrentlyEditingID(id));
  };

  const handleDelete = () => {
    const conf = confirm('Are you sure you want to delete this developer?');
    if (!conf) return;
    api
      .delete(`/developers/${_id}`)
      .then(({ data: { error } }) => {
        if (error) throw error;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Box
        sx={{
          '& button': {
            m: 1,
          },
        }}
      >
        <div>
          <Button variant="contained" onClick={handleToggle}>
            {isEditing ? 'Cancel edit' : 'Edit Developer'}
          </Button>

          <Button variant="contained" onClick={handleDelete}>
            Delete Developer
          </Button>
        </div>
      </Box>

      {isEditing ? (
        <EditDeveloper developer={developer} />
      ) : (
        <Box sx={{ width: '100%', marginTop: 3 }}>
          {Object.entries(developer).map(
            ([key, val], idx) =>
              !['__v', '_id', 'projectId', 'type'].includes(key) && (
                <Typography key={idx} variant="h6" gutterBottom component="div">
                  {capitalize(key)}: {val}
                </Typography>
              )
          )}
        </Box>
      )}
    </div>
  );
}
