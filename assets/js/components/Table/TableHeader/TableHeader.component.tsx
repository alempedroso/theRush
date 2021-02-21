import React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { FiltersActions } from "../../../store/filters/reducer";
import { AppState } from "../../../store/index";

type HeaderCell = {
  label: string;
  align: "left" | "right";
  sortField?: string;
};

export const headerCells: HeaderCell[] = [
  { label: "Player", align: "left" },
  { label: "Team", align: "left" },
  { label: "Pos", align: "left" },
  { label: "Att", align: "right" },
  { label: "Att/G", align: "right" },
  {
    label: "Yds",
    align: "right",
    sortField: "total_rushing_yards",
  },
  { label: "Avg", align: "right" },
  { label: "Yds/G", align: "right" },
  {
    label: "TD",
    align: "right",
    sortField: "total_rushing_takedowns",
  },
  { label: "Lng", align: "right", sortField: "longest_rush" },
  { label: "LngT", align: "right" },
  { label: "1st", align: "right" },
  { label: "1st%", align: "right" },
  { label: "20+", align: "right" },
  { label: "40+", align: "right" },
  { label: "FUM", align: "right" },
];

export const TableHeaderComponent: React.FC = () => {
  const filters = useSelector((state: AppState) => state.filters);
  const { order_by, order_by_direction } = filters;
  const dispatch = useDispatch();

  const getCurrentDirection = (field) => {
    if (field !== order_by) {
      return "desc";
    }

    return order_by_direction === "desc" ? "asc" : "desc";
  };

  const clickHandler = (field: string) => {
    dispatch({
      type: FiltersActions.SET_ORDER,
      payload: {
        order_by: field,
        order_by_direction: getCurrentDirection(field),
      },
    });
  };

  return (
    <TableHead>
      <TableRow>
        {headerCells.map(({ label, align, sortField }) => (
          <TableCell key={label} align={align} role="columnheader">
            {sortField ? (
              <TableSortLabel
                active={order_by === sortField}
                direction={order_by === sortField ? order_by_direction : "asc"}
                onClick={() => clickHandler(sortField)}
                role="button"
              >
                {label}
                {order_by === label ? (
                  <span>
                    {order_by_direction === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaderComponent;
