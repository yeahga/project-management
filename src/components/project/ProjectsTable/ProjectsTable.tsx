import React from 'react';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

import { ProjectProps } from '../@types';
import { useStyles } from './styles';

export type ProjectsTableProps = { projects: ProjectProps[] };

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Project name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Developer list</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.name} className={classes.hideLastBorder}>
              <TableCell component="th" scope="project">
                <Tooltip title="Go to project" placement="right">
                  <Link to={`/projects/${project._id}`}>
                    {project.name || ' - '}
                  </Link>
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                {project.description || ' - '}
              </TableCell>
              <TableCell align="right">
                {Array.isArray(project.developers) && project.developers.length
                  ? project.developers.map(({ name, _id }) => (
                      <p key={_id}>
                        <Tooltip title="Go to developer" placement="left">
                          <Link to={`/developers/${_id}`}>{name || ' - '}</Link>
                        </Tooltip>
                      </p>
                    ))
                  : ' - '}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
