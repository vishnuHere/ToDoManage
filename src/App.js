import React, { Suspense } from "react";
import "./styles.css";
import { history } from "./history";
import { Router, Route, Switch } from "react-router-dom";
import Components from "./components";

const routePaths = {
  toDoList: "/",
  toDoCreate: "/create",
  toDoUpdate: "/update/:id"
};

export default function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path={routePaths.toDoList}
              component={Components.ToDoList}
            />
            <Route
              exact
              path={routePaths.toDoCreate}
              component={Components.ToDoCreate}
            />
            <Route
              exact
              path={routePaths.toDoUpdate}
              component={Components.ToDoUpdate}
            />
            <Route component={Components.PageNotFound} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}
