import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const SIDEBAR_WIDTH = 240;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
);
