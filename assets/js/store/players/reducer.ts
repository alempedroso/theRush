import { Reducer } from "redux";
import { Player } from "../../types/player";
import { ReduxAction } from "../../types/redux";

export const PlayersActions = Object.freeze({
  PLAYERS_FETCHED: "PLAYERS/PLAYERS_FETCHED",
  PLAYERS_RESET: "PLAYERS/PLAYERS_RESET",
});

export type PlayersState = Partial<{
  players: Player[];
  total: number;
}>;

const playersInitialState = {};

const playersReducer: Reducer<PlayersState, ReduxAction<PlayersState>> = (
  state: PlayersState = playersInitialState,
  action
) => {
  switch (action.type) {
    case PlayersActions.PLAYERS_FETCHED:
      return {
        ...action.payload,
      };

    case PlayersActions.PLAYERS_RESET:
      return playersInitialState;

    default:
      return state;
  }
};

export default playersReducer;
