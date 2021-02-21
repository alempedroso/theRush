import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TablePagination } from "@material-ui/core";
import { FiltersActions } from "../../../store/filters/reducer";
import { AppState } from "../../../store/index";

export const TablePaginator: React.FC = () => {
  const { players_count } = useSelector((state: AppState) => state.players);
  const { limit, page } = useSelector((state: AppState) => state.filters);
  const dispatch = useDispatch();

  const changePageHandler = (_, page: number) => {
    dispatch({
      type: FiltersActions.CHANGE_PAGE,
      payload: { page },
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: FiltersActions.CHANGE_PLAYERS_PER_PAGE,
      payload: {
        limit: parseInt(event.target.value, 10),
        page: 0,
      },
    });
  };

  return (
    <TablePagination
      rowsPerPageOptions={[10, 20, 50]}
      component="div"
      count={players_count}
      rowsPerPage={limit}
      page={page}
      onChangePage={changePageHandler}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      SelectProps={
        {
          SelectDisplayProps: {
            "data-testid": "dale",
          },
        } as any
      }
    />
  );
};

export default TablePaginator;
