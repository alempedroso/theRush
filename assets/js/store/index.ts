import { createStore, combineReducers } from "redux";
import filtersReducer from "./filters/reducer";
import playersReducer from "./players/reducer";

const rootReducer = combineReducers({
  filters: filtersReducer,
  players: playersReducer,
});

const store = createStore(
  rootReducer,
  (window as any)?.__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any)?.__REDUX_DEVTOOLS_EXTENSION__()
);

export type AppState = ReturnType<typeof rootReducer>;

export default store;
