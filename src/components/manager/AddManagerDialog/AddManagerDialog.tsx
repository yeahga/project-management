import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';

const AddManagerForm = React.lazy(() => import('../AddManagerForm'));

export type AddManagerDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddManagerDialog({
  isOpen,
  onClose,
}: AddManagerDialogProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="сreate-manager-dialog-title"
      open={isOpen}
    >
      {isOpen && (
        <React.Suspense fallback={<CircularProgress />}>
          <AddManagerForm onClose={handleClose} />
        </React.Suspense>
      )}
    </Dialog>
  );
}
