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
        <Route path="/month-plan" component={MonthPlanning} />
        <Route path="/:year/week/:week" component={WeekCalendar} />
        <Route path="/week-plan" component={WeekPlanning} />
        <Route path="/day" component={DayPlanning} />
      </Switch>
    </div>
  );
}

export default App;
