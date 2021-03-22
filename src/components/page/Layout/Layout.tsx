import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Header from '../Header';
import Main from '../Main';
import Sidebar from '../Sidebar';
import { useStyles } from './styles';

export default function Layout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Main />
    </div>
  );
}
