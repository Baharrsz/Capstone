import React from "react";
import { Route, Switch } from "react-router-dom";
import MonthCalendar from "./components/MonthCalendar";

import MonthPlanning from "./components/MonthPlanning";
import WeekCalendar from "./components/WeekCalendar";
import WeekPlanning from "./components/WeekPlanning";
import DayPlanning from "./components/DayPlanning";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={MonthCalendar} />
        <Route path="/:year/:month/plan" exact component={MonthPlanning} />
        <Route path="/:year/week/:week" exact component={WeekCalendar} />
        <Route path="/:year/week/:week/plan" component={WeekPlanning} />
        <Route path="/:year/:month/:day" component={DayPlanning} />
      </Switch>
    </div>
  );
}

export default App;
