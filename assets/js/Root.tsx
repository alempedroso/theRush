import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core";
import Header from "./components/Header/Header.component";
import HomePage from "./pages";
import { Provider } from "react-redux";
import store from "./store/index";

const useStyles = makeStyles(({ spacing }) =>
  createStyles({
    root: {
      margin: spacing(4),
    },
  })
);

const Root: React.FC = () => {
  const styles = useStyles();

  return (
    <Provider store={store}>
      <div className={styles.root}>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default Root;
