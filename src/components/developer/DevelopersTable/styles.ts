import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  hideLastBorder: {
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },
});
