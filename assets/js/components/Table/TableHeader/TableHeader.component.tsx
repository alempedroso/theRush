import React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@material-ui/core";

type Order = "asc" | "desc";

type HeaderCell = {
  label: string;
  align: "left" | "right";
};

export const headerCells: HeaderCell[] = [
  { label: "Player", align: "left" },
  { label: "Team", align: "left" },
  { label: "Pos", align: "left" },
  { label: "Att", align: "right" },
  { label: "Att/G", align: "right" },
  { label: "Yds", align: "right" },
  { label: "Avg", align: "right" },
  { label: "Yds/G", align: "right" },
  { label: "TD", align: "right" },
  { label: "Lng", align: "right" },
  { label: "1st", align: "right" },
  { label: "1st%", align: "right" },
  { label: "20+", align: "right" },
  { label: "40+", align: "right" },
  { label: "FUM", align: "right" },
];

interface TableHeaderProps {
  onRequestSort: (property: string) => void;
  order: Order;
  orderBy: string;
}

export const TableHeaderComponent = (props: TableHeaderProps) => {
  const { order, orderBy, onRequestSort } = props;

  return (
    <TableHead>
      <TableRow>
        {headerCells.map(({ label, align }) => (
          <TableCell
            key={label}
            sortDirection={orderBy === label ? order : false}
            align={align}
            role="columnheader"
          >
            <TableSortLabel
              active={orderBy === label}
              direction={orderBy === label ? order : "asc"}
              onClick={() => onRequestSort(label)}
              role="button"
            >
              {label}
              {orderBy === label ? (
                <span>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaderComponent;
