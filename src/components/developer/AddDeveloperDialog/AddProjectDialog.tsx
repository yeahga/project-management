import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddDeveloperForm = React.lazy(() => import('../AddDeveloperForm'));

export type AddDeveloperDialogProps = {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function AddDeveloperDialog({
  projectId,
  isOpen,
  onClose,
}: AddDeveloperDialogProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="сreate-developer-dialog-title"
      open={isOpen}
    >
      <DialogTitle id="сreate-developer-dialog-title">
        Create a developer
      </DialogTitle>
      <DialogContent>
        {isOpen && (
          <React.Suspense fallback={<CircularProgress />}>
            <AddDeveloperForm onClose={handleClose} projectId={projectId} />
          </React.Suspense>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
