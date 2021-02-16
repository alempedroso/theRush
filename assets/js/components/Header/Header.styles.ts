import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ spacing }) =>
  createStyles({
    root: {
      padding: spacing(1),
    },
  })
);

export default useStyles;
