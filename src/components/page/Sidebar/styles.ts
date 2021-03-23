import { SIDEBAR_WIDTH } from '@config';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: SIDEBAR_WIDTH,
      flexShrink: 0,
    },
    drawerPaper: {
      width: SIDEBAR_WIDTH,
      boxSizing: 'border-box',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
  })
);
