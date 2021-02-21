import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ spacing }) =>
  createStyles({
    root: {
      padding: spacing(1),
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

export default useStyles;
