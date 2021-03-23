import api from 'api';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import toString from '@libs/toString';
import { CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';

import { init, setError, setCurrent } from '@redux/actions';

import type { State } from '@redux/reducers/treeReducer';

function extractIds(arr: any[]) {
  const res: any = [];

  arr.forEach((el) => {
    if (el._id) res.push(el._id);
    if (el.projects) res.push(...extractIds(el.projects));
    if (el.managers) res.push(...extractIds(el.managers));
  });

  return res;
}

export default function Tree() {
  const { error, isFetching, managers } = useSelector(
    ({ state }: { state: State }) => state
  );
  const dispatch = useDispatch();

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

  const handleTreeItemClick = (user: any) => {
    dispatch(setCurrent(user));
  };

  const expanded = React.useMemo(() => {
    return extractIds(managers);
  }, [managers]);

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {toString(error.error || error.message || error)}
      </Alert>
    );
  }

  return (
    <div>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          <TreeView
            // defaultCollapseIcon={<ExpandMoreIcon />}
            // defaultExpandIcon={<ChevronRightIcon />}
            multiSelect={false}
            expanded={expanded}
          >
            {managers.map((manager) => (
              <TreeItem
                key={manager._id}
                nodeId={manager._id}
                label={
                  <Typography variant="body2" color="rgb(26 115 232)">
                    {`${manager.name} (manager)`}
                  </Typography>
                }
                onClick={() => handleTreeItemClick(manager)}
              >
                {Array.isArray(manager.projects) &&
                  manager.projects.map((project) => (
                    <TreeItem
                      key={project._id}
                      nodeId={project._id}
                      label={
                        <Typography variant="body2" color="rgb(227 116 47)">
                          {`${project.name} (project)`}
                        </Typography>
                      }
                      onClick={() => handleTreeItemClick(project)}
                    >
                      {Array.isArray(project.developers) &&
                        project.developers.map((developer: any) => (
                          <TreeItem
                            key={developer._id}
                            nodeId={developer._id}
                            label={
                              <Typography
                                variant="body2"
                                color="rgb(162 80 245)"
                              >
                                {`${developer.name} (developer)`}
                              </Typography>
                            }
                            onClick={() => handleTreeItemClick(developer)}
                          />
                        ))}
                    </TreeItem>
                  ))}
              </TreeItem>
            ))}
          </TreeView>
        </>
      )}
    </div>
  );
}
