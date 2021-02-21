import { Button, Typography } from "@material-ui/core";
import * as React from "react";
import useStyles from "./Header.styles";
import { useDownloadExportData } from "../../hooks/useDownloadExportData";

const Header: React.FC = () => {
  const styles = useStyles();
  const downloadExportData = useDownloadExportData();

  return (
    <header className={styles.root}>
      <Typography variant="h4">Players</Typography>

      <Button variant="contained" color="primary" onClick={downloadExportData}>
        Export result
      </Button>
    </header>
  );
};

export default Header;
