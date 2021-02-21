import React from "react";
import { TableBody } from "@material-ui/core";
import TableRow from "../TableRow/TableRow.component";
import { AppState } from "../../../store/index";
import { useSelector } from "react-redux";

const TableBodyComponent: React.FC = () => {
  const { players } = useSelector((state: AppState) => state.players);

  return players ? (
    <TableBody>
      {players.map((row) => (
        <TableRow key={row.name} row={row} />
      ))}
    </TableBody>
  ) : null;
};

export default TableBodyComponent;
