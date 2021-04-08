import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';

const AddProjectForm = React.lazy(() => import('../AddProjectForm'));

export type AddProjectDialogProps = {
  managerId: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function AddProjectDialog({
  managerId,
  isOpen,
  onClose,
}: AddProjectDialogProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="сreate-project-dialog-title"
      open={isOpen}
    >
      {isOpen && (
        <React.Suspense fallback={<CircularProgress />}>
          <AddProjectForm
            formType="__ADD_FORM__"
            onClose={handleClose}
            managerId={managerId}
          />
        </React.Suspense>
      )}
    </Dialog>
  );
}
