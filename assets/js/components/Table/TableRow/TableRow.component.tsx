import React from "react";
import { TableCell, TableRow } from "@material-ui/core";

export const rowKeys = [
  "name",
  "team",
  "position",
  "rushing_attempts_per_game_avg",
  "rushing_attempts",
  "total_rushing_yards",
  "total_rushing_yards_per_attempt",
  "rushing_yards_per_game",
  "total_rushing_takedowns",
  "longest_rush",
  "rushing_first_downs",
  "rushing_first_down_percentage",
  "rushing_twenty_plus_yards",
  "rushing_forty_plus_yards",
  "rushing_flumbles",
];

const TableRowComponent: React.FC<any> = ({ row }) => {
  return (
    <TableRow hover role="row" tabIndex={-1}>
      {rowKeys.map((key) => (
        <TableCell
          key={key}
          role="cell"
          align={isNaN(Number(row[key])) ? "left" : "right"}
        >
          {row[key]}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableRowComponent;
