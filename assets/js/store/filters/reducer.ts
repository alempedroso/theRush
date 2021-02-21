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
  order_by: string;
  order_by_direction: string;
  page: number;
  limit: number;
  player_name: string;
}>;

const filtersInitialState = {
  page: 0,
  limit: 10,
};

const filtersReducer: Reducer<FiltersState, ReduxAction<FiltersState>> = (
  state: FiltersState = filtersInitialState,
  action
) => {
  switch (action.type) {
    case FiltersActions.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };

    case FiltersActions.CHANGE_PLAYERS_PER_PAGE:
      return {
        ...state,
        limit: action.payload.limit,
        page: 0,
      };

    case FiltersActions.SET_ORDER:
      return {
        ...state,
        order_by: action.payload.order_by,
        order_by_direction: action.payload.order_by_direction,
      };

    case FiltersActions.FILTER_PLAYER:
      return {
        ...state,
        player_name: action.payload.player_name,
        page: 0,
      };

    case FiltersActions.RESET_FILTERS:
      return filtersInitialState;

    default:
      return state;
  }
};

export default filtersReducer;
