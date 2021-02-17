import { createStore, combineReducers } from "redux";
import filtersReducer from "./filters/reducer";
import playersReducer from "./players/reducer";

const rootReducer = combineReducers({
  filters: filtersReducer,
  players: playersReducer,
});

const store = createStore(rootReducer);

export default store;
