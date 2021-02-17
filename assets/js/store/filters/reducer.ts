import { Reducer } from "redux";
import { ReduxAction } from "../../types/redux";

export const FiltersActions = Object.freeze({
  CHANGE_PAGE: "FILTERS/CHANGE_PAGE",
  CHANGE_PLAYERS_PER_PAGE: "FILTERS/CHANGE_PLAYERS_PER_PAGE",
  SET_ORDER: "FILTERS/SET_ORDER",
  FILTER_PLAYER: "FILTERS/FILTER_BY_PLAYER",
  RESET_FILTERS: "FILTERS/RESET_FILTERS",
});

export type FiltersState = Partial<{
  orderBy: string;
  currentPage: number;
  playersPerPage: number;
  playerName: string;
}>;

const filtersInitialState = {
  currentPage: 0,
  playersPerPage: 10,
};

const filtersReducer: Reducer<FiltersState, ReduxAction<FiltersState>> = (
  state: FiltersState = filtersInitialState,
  action
) => {
  switch (action.type) {
    case FiltersActions.CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload.currentPage,
      };

    case FiltersActions.CHANGE_PLAYERS_PER_PAGE:
      return {
        ...state,
        playersPerPage: action.payload.playersPerPage,
      };

    case FiltersActions.SET_ORDER:
      return {
        ...state,
        orderBy: action.payload.orderBy,
      };

    case FiltersActions.FILTER_PLAYER:
      return {
        ...state,
        playerName: action.payload.playerName,
      };

    case FiltersActions.RESET_FILTERS:
      return filtersInitialState;

    default:
      return state;
  }
};

export default filtersReducer;
