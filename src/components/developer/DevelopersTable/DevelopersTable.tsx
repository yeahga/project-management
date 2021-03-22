import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useStyles } from './styles';
import type { DeveloperProps } from '../@types';

export type DevelopersTableProps = { developers: DeveloperProps[] };

export default function DevelopersTable({ developers }: DevelopersTableProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone number</TableCell>
            <TableCell align="right">Position</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {developers.map((developer) => (
            <TableRow key={developer.name} className={classes.hideLastBorder}>
              <TableCell component="th" scope="developer">
                {developer.name || ' - '}
              </TableCell>
              <TableCell align="right">{developer.email || ' - '}</TableCell>
              <TableCell align="right">{developer.phone || ' - '}</TableCell>
              <TableCell align="right">{developer.position || ' - '}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
