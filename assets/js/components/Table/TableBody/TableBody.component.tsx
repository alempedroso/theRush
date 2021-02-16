import React from "react";
import { TableBody } from "@material-ui/core";
import TableRow from "../TableRow/TableRow.component";

const TableBodyComponent = ({ rows }) => {
  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.name} row={row} />
      ))}
    </TableBody>
  );
};

export default TableBodyComponent;
