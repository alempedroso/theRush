import React from "react";
import data from "../../../../../fixtures/rushing.json";
import { render } from "@testing-library/react";
import TableRow from "./TableRow.component";
import { convertRawDataToFormattedData } from "../../../helpers";

const row = convertRawDataToFormattedData(data[0]);

describe("<TableRow />", () => {
  it("renders all values", () => {
    const { queryAllByText } = render(
      <table>
        <tbody>
          <TableRow row={row} />
        </tbody>
      </table>
    );

    Object.values(row).forEach((value) => {
      expect(queryAllByText(value).length).toBeGreaterThan(0);
    });
  });
});
