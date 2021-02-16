import { Typography } from "@material-ui/core";
import * as React from "react";
import useStyles from "./Header.styles";

const Header: React.FC = () => {
  const styles = useStyles();

  return (
    <header className={styles.root}>
      <Typography variant="h4">Players</Typography>
    </header>
  );
};

export default Header;
