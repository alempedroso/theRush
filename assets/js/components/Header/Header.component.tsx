import * as React from "react";
import useStyles from "./Header.styles";

const Header: React.FC = () => {
  const styles = useStyles();

  return <header className={styles.root}>theRush</header>;
};

export default Header;
