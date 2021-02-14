import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header.component";
import HomePage from "./pages";

const Root: React.FC = () => (
  <>
    <Header />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  </>
);

export default Root;
