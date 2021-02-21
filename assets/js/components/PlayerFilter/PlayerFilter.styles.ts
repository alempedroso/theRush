import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ spacing }) =>
  createStyles({
    root: {
      display: "flex",
      justifyItems: "center",
      alignItems: "center",
      margin: `${spacing(2)}px ${spacing(1)}px`,
    },
    input: {
      marginRight: spacing(2),
    },
  })
);

export default useStyles;
