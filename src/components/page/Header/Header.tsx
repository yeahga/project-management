import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';

import { useStyles } from './styles';

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography
          className={classes.title}
          variant="h6"
          noWrap
          component="div"
        >
          {'Itransition'}
        </Typography>

        <IconButton
          to="/"
          aria-label="main page"
          component={Link}
          color="inherit"
        >
          <HomeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
