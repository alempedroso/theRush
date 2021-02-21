import data from "../../../../../fixtures/rushing.json";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import TableBody from "./TableBody.component";
import { convertRawDataToFormattedData } from "../../../helpers";
import { client } from "../../../services/apiClient";
import { Provider } from "react-redux";
import store from "../../../store/index";
import { PlayersActions } from "../../../store/players/reducer";

jest.mock("../../../services/apiClient", () => ({
  ...jest.requireActual("../../../services/apiClient"),
  client: {
    get: jest.fn(),
  },
}));

const desiredAmount = 10;

const rowsData = data
  .slice(0, desiredAmount)
  .map(convertRawDataToFormattedData);

describe("<TableBody />", () => {
  beforeEach(() => {
    (client.get as jest.Mock).mockImplementation(() => ({
      data: rowsData,
    }));
  });

  describe(`when passing ${desiredAmount} rows`, () => {
    it("renders the same amount of rows in store", async () => {
      const { queryAllByRole } = render(
        <Provider store={store}>
          <table>
            <TableBody />
          </table>
        </Provider>
      );

      store.dispatch({
        type: PlayersActions.PLAYERS_FETCHED,
        payload: {
          players: rowsData,
          players_count: desiredAmount,
        },
      });

      await waitFor(() => {
        const renderedRows = queryAllByRole("row");
        expect(renderedRows).toHaveLength(desiredAmount);
      });
    });
  });
});
