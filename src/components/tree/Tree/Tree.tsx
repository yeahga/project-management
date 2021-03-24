import api from 'api';
import React from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import getProjectById from '@components/project/@helpers/getProjectById';
import useProjects from '@components/project/@hooks/useProjects';
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
import { init, moveDeveloper, setError } from '@redux/actions';

import { useStyles } from './styles';

export default function Tree() {
  const { error, isFetching, managers } = useState();
  const dispatch = useDispatch();
  const classes = useStyles();
  const projects = useProjects();

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

  const handleDragEnd = ({ source, destination }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const sourceProjectId = source.droppableId;
    const destProjectId = destination.droppableId;

    // same list
    if (sourceProjectId === destProjectId) return;

    const sourceProject = getProjectById(projects, sourceProjectId);
    const destProject = getProjectById(projects, destProjectId);

    if (!sourceProject || !destProject) return;

    const developer = { ...sourceProject.developers[source.index] };
    const newDeveloper = { ...developer, projectId: destProjectId };

    dispatch(
      moveDeveloper({
        developer: newDeveloper,
        sourceProjectId,
        destProjectId,
      })
    );

    api
      .put(`/developers/${newDeveloper._id}`, {
        ...newDeveloper,
      })
      .then(({ data: { error } }) => {
        if (error) throw error;
      })
      .catch((error) => {
        console.log(error);
        // Move back on error
        dispatch(
          moveDeveloper({
            developer,
            sourceProjectId: destProjectId,
            destProjectId: sourceProjectId,
          })
        );
      });
  };

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
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box>
        <List
          className={classes.treeRoot}
          component="nav"
          aria-labelledby="manager-list-subheader"
        >
          <ListSubheader component="div" id="manager-list-subheader">
            {!managers.length ? 'Add the first manager' : 'Navigation'}
          </ListSubheader>
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
                <List component="div" disablePadding>
                  {manager.projects.map((project) => (
                    <Droppable key={project._id} droppableId={project._id}>
                      {(provided) => (
                        <div ref={provided.innerRef}>
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
                            <List component="div" disablePadding>
                              {project.developers.map((developer, idx) => (
                                <Draggable
                                  key={developer._id}
                                  draggableId={developer._id}
                                  index={idx}
                                >
                                  {(provided) => (
                                    <ListItem
                                      button
                                      component={NavLink}
                                      activeClassName="Mui-selected"
                                      exact
                                      to={`/developers/${developer._id}`}
                                      className={classes.nested2}
                                      ref={provided.innerRef}
                                      key={developer._id}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <ListItemIcon
                                        className={classes.listItemIcon}
                                      >
                                        <PersonIcon />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={developer.name}
                                        // secondary="developer"
                                        className={classes.listItemText}
                                      />
                                    </ListItem>
                                  )}
                                </Draggable>
                              ))}
                            </List>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </List>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </DragDropContext>
  );
}
