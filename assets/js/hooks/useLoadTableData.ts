import { useDispatch, useSelector } from "react-redux";
import { searchPlayer } from "../services/apiClient";
import { PlayersActions } from "../store/players/reducer";
import { AppState } from "../store/index";

export const useLoadTableData = (): (() => Promise<void>) => {
  const filters = useSelector((state: AppState) => state.filters);
  const dispatch = useDispatch();

  return async () => {
    try {
      const { data } = await searchPlayer(filters);

      dispatch({
        type: PlayersActions.PLAYERS_FETCHED,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PlayersActions.PLAYERS_RESET,
      });

      window.alert("Error fetching API data. Please, try again later.");
    }
  };
};
