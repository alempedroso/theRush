import data from "../../../../../fixtures/rushing.json";
import { render } from "@testing-library/react";
import React from "react";
import TableBody from "./TableBody.component";
import { convertRawDataToFormattedData } from "../../../helpers";

const desiredAmount = 10;

const rowsData = data
  .slice(0, desiredAmount)
  .map(convertRawDataToFormattedData);

describe("<TableBody />", () => {
  describe(`when passing ${desiredAmount} rows`, () => {
    it("renders the same amount of rows received", () => {
      const { queryAllByRole } = render(
        <table>
          <TableBody rows={rowsData} />
        </table>
      );
      const renderedRows = queryAllByRole("row");

      expect(renderedRows).toHaveLength(desiredAmount);
    });
  });
});
