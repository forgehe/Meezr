import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Browse from "../components/Browse";
import Profile from "../components/Profile";
import SingleMeal from "../components/SingleMeal";
import NewMeal from "../components/NewMeal";

export default (
  <Router>
    <Switch>
      <Route path="/" exact render={(props) => <Browse props={props} />} />
      <Route
        path="/search/:id"
        exact
        render={(props) => <Browse props={props} />}
      />
      <Route path="/profile" exact component={Profile} />
      <Route
        path="/meals/:id"
        exact
        render={(props) => <SingleMeal props={props} />}
      />
      <Route path="/create" exact component={NewMeal} />
    </Switch>
  </Router>
);
