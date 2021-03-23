import api from 'api';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import useState from '@hooks/useState';
import toString from '@libs/toString';
import { CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ManageAccountsIcon from '@material-ui/icons/ManageAccounts';
import PersonIcon from '@material-ui/icons/Person';
import { init, setError } from '@redux/actions';

import { useStyles } from './styles';

export default function Tree() {
  const { error, isFetching, managers } = useState();
  const dispatch = useDispatch();
  const classes = useStyles();

  React.useEffect(() => {
    api
      .get('/managers')
      .then(({ data: { error, data } }) => {
        if (error) throw error;
        dispatch(init(data.managers));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  }, [dispatch]);

  if (isFetching) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {toString(error.error || error.message || error)}
      </Alert>
    );
  }

  return (
    <Box>
      <List
        component="nav"
        aria-labelledby="manager-list-subheader"
        subheader={
          <ListSubheader component="div" id="manager-list-subheader">
            {!managers.length ? 'Add the first manager' : 'Navigation'}
          </ListSubheader>
        }
      >
        {managers.map((manager) => (
          <React.Fragment key={manager._id}>
            <ListItem
              button
              component={NavLink}
              activeClassName="Mui-selected"
              exact
              to={`/managers/${manager._id}`}
              className={classes.nested0}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText
                primary={manager.name}
                // secondary="manager"
                className={classes.listItemText}
              />
            </ListItem>
            {Array.isArray(manager.projects) && (
              <List disablePadding>
                {manager.projects.map((project) => (
                  <React.Fragment key={project._id}>
                    <ListItem
                      button
                      component={NavLink}
                      activeClassName="Mui-selected"
                      exact
                      to={`/projects/${project._id}`}
                      className={classes.nested1}
                    >
                      <ListItemIcon className={classes.listItemIcon}>
                        <AccountTreeIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={project.name}
                        // secondary="project"
                        className={classes.listItemText}
                      />
                    </ListItem>
                    {Array.isArray(project.developers) && (
                      <List disablePadding>
                        {project.developers.map((developer: any) => (
                          <ListItem
                            key={developer._id}
                            button
                            component={NavLink}
                            activeClassName="Mui-selected"
                            exact
                            to={`/developers/${developer._id}`}
                            className={classes.nested2}
                          >
                            <ListItemIcon className={classes.listItemIcon}>
                              <PersonIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={developer.name}
                              // secondary="developer"
                              className={classes.listItemText}
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </React.Fragment>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
