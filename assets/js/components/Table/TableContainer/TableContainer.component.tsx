import React from "react";
import TableHeader from "../TableHeader/TableHeader.component";
import TableBody from "../TableBody/TableBody.component";
import { Table } from "@material-ui/core";
import TablePaginator from "../TablePaginator/TablePaginator.component";
import { useRefreshTable } from "../../../hooks/useRefreshTable";

const TableContainer: React.FC = () => {
  useRefreshTable();

  return (
    <>
      <Table>
        <TableHeader />
        <TableBody />
      </Table>
      <TablePaginator />
    </>
  );
};

export default TableContainer;
