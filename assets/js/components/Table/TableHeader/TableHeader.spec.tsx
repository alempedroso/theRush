import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import TableHeader, { headerCells } from "./TableHeader.component";

describe("<TableHeader />", () => {
  const headersLength = headerCells.length;

  it("show has correct number of headers", () => {
    const { queryAllByRole } = render(
      <table>
        <TableHeader order="desc" orderBy="dale" onRequestSort={() => {}} />
      </table>
    );

    expect(queryAllByRole("columnheader")).toHaveLength(headersLength);
  });

  describe("when a header column is clicked", () => {
    it("calls onRequestSort", async () => {
      const onRequestSortMock = jest.fn();

      const { queryAllByRole } = render(
        <table>
          <TableHeader
            order="desc"
            orderBy="dale"
            onRequestSort={onRequestSortMock}
          />
        </table>
      );

      const columnHeaders = queryAllByRole("button");

      await waitFor(() => {
        columnHeaders.forEach((columnHeader) => {
          fireEvent.click(columnHeader);
        });

        expect(onRequestSortMock).toBeCalledTimes(headersLength);
      });
    });
  });
});
