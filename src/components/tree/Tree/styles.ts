import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    treeRoot: {
      backgroundColor: theme.palette.background.paper,
    },
    listItemIcon: {
      minWidth: '36px !important',
    },
    listItemText: {
      marginTop: '0 !important',
      marginBottom: '0 !important',
    },
    nested0: {
      color: 'rgb(26 115 232) !important',
    },
    nested1: {
      paddingLeft: '40px !important',
      color: 'rgb(227 116 47) !important',
    },
    nested2: {
      paddingLeft: '60px !important',
      color: 'rgb(162 80 245) !important',
    },
  })
);
