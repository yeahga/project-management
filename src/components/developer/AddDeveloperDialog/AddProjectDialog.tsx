import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';

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
      {isOpen && (
        <React.Suspense fallback={<CircularProgress />}>
          <AddDeveloperForm onClose={handleClose} projectId={projectId} />
        </React.Suspense>
      )}
    </Dialog>
  );
}
