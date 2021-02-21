import React from "react";
import { Provider } from "react-redux";
import { render, waitFor } from "@testing-library/react";
import TableContainer from "./TableContainer.component";
import { convertRawDataToFormattedData } from "../../../helpers";
import { client as clientMock } from "../../../services/apiClient";
import data from "../../../../../fixtures/rushing.json";
import store from "../../../store/index";

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

describe("<TableContainer />", () => {
  beforeEach(() => {
    (clientMock.get as jest.Mock).mockImplementation(() => ({
      data: { players: rowsData, players_count: rowsData.length },
    }));
  });

  it("renders without errors", async () => {
    const { queryAllByRole, queryAllByText } = render(
      <Provider store={store}>
        <TableContainer />
      </Provider>
    );

    await waitFor(() => {
      expect(queryAllByRole("button").length).toBeGreaterThan(0);
      expect(queryAllByRole("row").length).toBeGreaterThan(0);
      expect(queryAllByRole("columnheader").length).toBeGreaterThan(0);
      expect(queryAllByRole("cell").length).toBeGreaterThan(0);
      expect(queryAllByText("Rows per page:").length).toBeGreaterThan(0);
    });
  });
});
