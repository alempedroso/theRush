import { useSelector } from "react-redux";
import { exportPlayers } from "../services/apiClient";
import { AppState } from "../store/index";
import FileDownloader from "js-file-download";

export const useDownloadExportData = (): (() => Promise<void>) => {
  const filters = useSelector((state: AppState) => state.filters);

  return async () => {
    try {
      const { data } = await exportPlayers(filters);

      FileDownloader(data, "export.csv");
    } catch (error) {
      window.alert("Error fetching API data. Please, try again later.");
    }
  };
};
