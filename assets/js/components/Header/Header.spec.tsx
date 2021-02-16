import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header.component";

describe("<Header />", () => {
  it("show header text", () => {
    const { getByText } = render(<Header />);

    expect(getByText("Players")).toBeInTheDocument();
  });
});
