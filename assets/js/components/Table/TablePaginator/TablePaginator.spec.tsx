import React from "react";
import { act, render, fireEvent, waitFor } from "@testing-library/react";
import TablePaginator from "./TablePaginator.component";
import { Provider } from "react-redux";
import store from "../../../store/index";
import { convertRawDataToFormattedData } from "../../../helpers";
import data from "../../../../../fixtures/rushing.json";
import { PlayersActions } from "../../../store/players/reducer";

const desiredAmount = 50;

const rowsData = data
  .slice(0, desiredAmount)
  .map(convertRawDataToFormattedData);

describe("<TablePaginator />", () => {
  describe("when next page button is clicked", () => {
    it("update filter store", async () => {
      const { getByLabelText } = render(
        <Provider store={store}>
          <TablePaginator />
        </Provider>
      );

      store.dispatch({
        type: PlayersActions.PLAYERS_FETCHED,
        payload: { players: rowsData, players_count: rowsData.length },
      });

      const nextButton = getByLabelText("Next page");
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(store.getState().filters.page).toEqual(1);
        expect(store.getState().filters.limit).toEqual(10);
      });

      const previousButton = getByLabelText("Previous page");
      fireEvent.click(previousButton);

      await waitFor(() => {
        expect(store.getState().filters.page).toEqual(0);
        expect(store.getState().filters.limit).toEqual(10);
      });
    });
  });

  describe("when change page size", () => {
    it("update filter store", async () => {
      const { getByText, getAllByRole } = render(
        <Provider store={store}>
          <TablePaginator />
        </Provider>
      );

      store.dispatch({
        type: PlayersActions.PLAYERS_FETCHED,
        payload: { players: rowsData, players_count: rowsData.length },
      });

      const rowsPerPageBtn = getByText("10");
      fireEvent.mouseDown(rowsPerPageBtn);
      const options = getAllByRole("option");
      fireEvent.click(options[1]);

      await waitFor(() => {
        expect(store.getState().filters.page).toEqual(0);
        expect(store.getState().filters.limit).toEqual(20);
      });
    });
  });
});
