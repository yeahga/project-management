import React from 'react';
import { useSelector } from 'react-redux';

import ViewDeveloper from '@components/developer/ViewDeveloper';
import ViewManager from '@components/manager/ViewManager';
import ViewProject from '@components/project/ViewProject';
import Task from '@components/task/Task';

import { useStyles } from './styles';

import type { State } from '@redux/reducers/treeReducer';
export default function Main() {
  const classes = useStyles();

  const current = useSelector(({ state }: { state: State }) => state.current);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {current?.type === 'manager' ? (
        <ViewManager />
      ) : current?.type === 'project' ? (
        <ViewProject />
      ) : current?.type === 'developer' ? (
        <ViewDeveloper />
      ) : (
        <Task />
      )}
    </main>
  );
}
