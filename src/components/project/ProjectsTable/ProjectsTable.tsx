import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useStyles } from './styles';
import { ProjectProps } from '../@types';

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
                {project.name || ' - '}
              </TableCell>
              <TableCell align="right">
                {project.description || ' - '}
              </TableCell>
              <TableCell align="right">
                {Array.isArray(project.developers)
                  ? project.developers.map(({ name, _id }) => (
                      <p key={_id}>{name}</p>
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
