import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLoadTableData } from "./useLoadTableData";

export const useRefreshTable = () => {
  const filters = useSelector((state) => state.filters);
  const loadTableData = useLoadTableData();

  useEffect(() => {
    loadTableData();
  }, [filters]);
};
