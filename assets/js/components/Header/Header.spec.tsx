import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header.component";
import "@testing-library/jest-dom/extend-expect";

describe("<Header />", () => {
  it("renders", () => {
    const { getByText } = render(<Header />);

    expect(getByText("theRush")).toBeInTheDocument();
  });
});
