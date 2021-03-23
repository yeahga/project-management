import { SIDEBAR_WIDTH } from '@config';
import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      width: `calc(100% - ${SIDEBAR_WIDTH}px)!important`,
      marginLeft: SIDEBAR_WIDTH,
    },
    title: {
      flexGrow: 1,
    },
  })
);
