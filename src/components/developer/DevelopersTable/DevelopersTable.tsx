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
            <TableRow key={developer._id} className={classes.hideLastBorder}>
              <TableCell component="th" scope="developer">
                <Tooltip title="Go to developer" placement="right">
                  <Link to={`/developers/${developer._id}`}>
                    {developer.name || ' - '}
                  </Link>
                </Tooltip>
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
