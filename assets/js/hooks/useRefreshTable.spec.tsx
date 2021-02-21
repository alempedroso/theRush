import React from "react";
import { Provider } from "react-redux";
import { convertRawDataToFormattedData } from "../helpers";
import { client as clientMock } from "../services/apiClient";
import data from "../../../fixtures/rushing.json";
import store from "../store/index";
import { render, waitFor } from "@testing-library/react";
import { useRefreshTable } from "./useRefreshTable";
import { FiltersActions } from "../store/filters/reducer";

const TestComponent = () => {
  useRefreshTable();

  return <></>;
};

function setup() {
  return render(
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );
}

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  create: () => ({
    get: jest.fn(),
  }),
}));

const desiredAmount = 10;

const rowsData = data
  .slice(0, desiredAmount)
  .map(convertRawDataToFormattedData);

describe("useRefreshTable", () => {
  beforeEach(() => {
    (clientMock.get as jest.Mock).mockImplementation(() => ({
      data: { players: rowsData, players_count: rowsData.length },
    }));
  });

  describe("when componented is mounted", () => {
    it("calls API one time", () => {
      setup();
      expect(clientMock.get).toHaveBeenCalledTimes(1);
    });
  });

  describe.each([
    {
      type: FiltersActions.CHANGE_PAGE,
      payload: {
        page: 1,
      },
    },
    {
      type: FiltersActions.CHANGE_PLAYERS_PER_PAGE,
      payload: {
        page: 0,
        limit: 20,
      },
    },
    {
      type: FiltersActions.FILTER_PLAYER,
      payload: {
        player_name: "joe",
        page: 0,
      },
    },
    {
      type: FiltersActions.SET_ORDER,
      payload: {
        order_by: "longest_rush",
        order_by_direction: "desc",
        page: 0,
      },
    },
  ])("when filters store changes with %j action", (action) => {
    it("calls API again", async () => {
      setup();

      store.dispatch(action);

      await waitFor(() => {
        expect(clientMock.get).toHaveBeenCalledTimes(2);
      });
    });
  });
});
