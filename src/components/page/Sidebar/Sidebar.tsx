import React from 'react';

import Tree from '@components/tree/Tree';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';

import { useStyles } from './styles';

const AddManagerDialog = React.lazy(
  () => import('@components/manager/AddManagerDialog')
);

export default function Sidebar() {
  const classes = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.drawerHeader}>
        <Button onClick={handleOpen}>Add manager</Button>
      </div>
      <Divider />
      <Tree />

      <React.Suspense fallback={null}>
        <AddManagerDialog isOpen={isOpen} onClose={handleClose} />
      </React.Suspense>
    </Drawer>
  );
}
