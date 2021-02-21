import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import TableHeader, { headerCells } from "./TableHeader.component";
import { Provider } from "react-redux";
import store from "../../../store/index";

describe("<TableHeader />", () => {
  const headersLength = headerCells.length;

  it("show has correct number of headers", () => {
    const { queryAllByRole } = render(
      <Provider store={store}>
        <table>
          <TableHeader />
        </table>
      </Provider>
    );

    expect(queryAllByRole("columnheader")).toHaveLength(headersLength);
  });

  describe.each([
    { label: "Lng", expectedField: "longest_rush" },
    { label: "Yds", expectedField: "total_rushing_yards" },
    { label: "TD", expectedField: "total_rushing_takedowns" },
  ])("when sortable header %j is clicked", ({ label, expectedField }) => {
    it("update filter store", async () => {
      const { getByText } = render(
        <Provider store={store}>
          <table>
            <TableHeader />
          </table>
        </Provider>
      );

      const columnHeader = getByText(label);

      // First click

      fireEvent.click(columnHeader);

      await waitFor(() => {
        expect(store.getState().filters.order_by).toEqual(expectedField);
        expect(store.getState().filters.order_by_direction).toEqual("desc");
      });

      // Second click - direction toggle

      fireEvent.click(columnHeader);

      await waitFor(() => {
        expect(store.getState().filters.order_by).toEqual(expectedField);
        expect(store.getState().filters.order_by_direction).toEqual("asc");
      });
    });
  });
});
