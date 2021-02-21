import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { PlayerFilter } from "../components/PlayerFilter/PlayerFilter.component";
import TableContainer from "../components/Table/TableContainer/TableContainer.component";

const HomePage: React.FC<RouteComponentProps> = () => (
  <>
    <PlayerFilter />
    <TableContainer />
  </>
);

export default HomePage;
