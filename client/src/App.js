import React from "react";
import { Route, Switch } from "react-router-dom";
import MonthCalendar from "./components/MonthCalendar";

import WeekCalendar from "./components/WeekCalendar";
import PlanningPage from "./components/Shared Subcomponents/PlanningPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={MonthCalendar} />
        <Route
          path="/:year/:month/plan"
          exact
          render={props => <PlanningPage match={props.match} />}
        />
        <Route path="/:year/week/:week" exact component={WeekCalendar} />
        <Route
          path="/:year/week/:week/plan"
          render={props => <PlanningPage match={props.match} />}
        />
        <Route
          path="/:year/:month/:day/plan"
          render={props => <PlanningPage match={props.match} />}
        />
      </Switch>
    </div>
  );
}

export default App;
