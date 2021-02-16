import React from "react";
import { render } from "@testing-library/react";
import TableContainer from "./TableContainer.component";

describe("<TableContainer />", () => {
  it("renders without errors", () => {
    const { queryAllByRole, queryAllByText } = render(<TableContainer />);

    expect(queryAllByRole("button").length).toBeGreaterThan(0);
    expect(queryAllByRole("row").length).toBeGreaterThan(0);
    expect(queryAllByRole("columnheader").length).toBeGreaterThan(0);
    expect(queryAllByRole("cell").length).toBeGreaterThan(0);
    expect(queryAllByText("Rows per page:").length).toBeGreaterThan(0);
  });
});
