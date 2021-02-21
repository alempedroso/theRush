import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import PlayerFilter from "./PlayerFilter.component";
import { Provider } from "react-redux";
import store from "../../store/index";

describe("<PlayerFilter />", () => {
  describe("when name is input and search button is clicked", () => {
    it("update filter store", async () => {
      const { container } = render(
        <Provider store={store}>
          <PlayerFilter />
        </Provider>
      );

      const input = container.querySelector("input");
      const button = container.querySelector("button");
      fireEvent.change(input, { target: { value: "joe" } });
      fireEvent.click(button);

      await waitFor(() => {
        expect(store.getState().filters.player_name).toEqual("joe");
      });
    });
  });

  describe("when name is input enter key is pressed", () => {
    it("update filter store", async () => {
      const { container } = render(
        <Provider store={store}>
          <PlayerFilter />
        </Provider>
      );

      const input = container.querySelector("input");
      fireEvent.change(input, { target: { value: "joe" } });
      fireEvent.mouseDown(input, { key: "Enter" });

      await waitFor(() => {
        expect(store.getState().filters.player_name).toEqual("joe");
      });
    });
  });
});
