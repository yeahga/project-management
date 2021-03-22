import { createStyles, makeStyles } from '@material-ui/core/styles';

import { SIDEBAR_WIDTH } from '@config';

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
