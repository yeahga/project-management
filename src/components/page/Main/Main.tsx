import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DeveloperRoute from '@components/developer/DeveloperRoute';
import ManagerRoute from '@components/manager/ManagerRoute';
import ProjectRoute from '@components/project/ProjectRoute';
import Task from '@components/task/Task';
import useState from '@hooks/useState';
import toString from '@libs/toString';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import NoMatch from '../NoMatch';
import { useStyles } from './styles';

export default function Main() {
  const classes = useStyles();
  const { error, isFetching } = useState();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {isFetching ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {toString(error.error || error.message || error)}
        </Alert>
      ) : (
        <Switch>
          <Route exact strict path="/">
            <Task />
          </Route>
          <Route exact strict path="/managers/:managerId">
            <ManagerRoute />
          </Route>
          <Route exact strict path="/projects/:projectId">
            <ProjectRoute />
          </Route>
          <Route exact strict path="/developers/:developerId">
            <DeveloperRoute />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      )}
    </main>
  );
}
