import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Header from "./Header.component";
import { client as clientMock } from "../../services/apiClient";
import { Provider } from "react-redux";
import store from "../../store/index";
import FileDownloader from "js-file-download";

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  create: () => ({
    get: jest.fn(),
  }),
}));

jest.mock("js-file-download");

describe("<Header />", () => {
  it("show header text and button", () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(getByText("Players")).toBeInTheDocument();
    expect(getByRole("button")).toBeInTheDocument();
  });

  describe("when clicking in export button", () => {
    beforeEach(() => {
      (clientMock.get as jest.Mock).mockImplementation(() => ({
        data: "download-stream",
      }));
    });

    it("calls API and start download", async () => {
      const { getByRole } = render(
        <Provider store={store}>
          <Header />
        </Provider>
      );

      const button = getByRole("button");

      fireEvent.click(button);

      await waitFor(() => {
        expect(clientMock.get).toHaveBeenCalledWith(
          "/players/export",
          expect.objectContaining({
            params: {
              limit: 10,
              page: 0,
            },
          })
        );

        expect(FileDownloader).toHaveBeenCalledWith(
          "download-stream",
          "export.csv"
        );
      });
    });
  });
});
