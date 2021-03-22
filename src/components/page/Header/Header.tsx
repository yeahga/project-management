import AppBar from '@material-ui/core/AppBar';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { goHome } from '@redux/actions';
import useCurrent from '@hooks/useCurrent';
import { useDispatch } from 'react-redux';
import { useStyles } from './styles';

export default function Header() {
  const classes = useStyles();

  const { current } = useCurrent();

  const dispatch = useDispatch();

  const handleHome = () => {
    dispatch(goHome());
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography
          className={classes.title}
          variant="h6"
          noWrap
          component="div"
        >
          {current ? `${current.type}: ${current.name}` : 'Itransition'}
        </Typography>
        <IconButton aria-label="main page" onClick={handleHome} color="inherit">
          <HomeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
