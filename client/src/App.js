import React from "react";
import { Route, Switch } from "react-router-dom";
import MonthCalendar from "./components/MonthCalendar";

import MonthPlanning from "./components/MonthPlanning";
import WeekCalendar from "./components/WeekCalendar";
import WeekPlanning from "./components/WeekPlanning";
import DayPlanning from "./components/DayPlanning";
import PlanningPage from "./components/Shared Subcomponents/PlanningPage";

import Events from "./components/Shared Subcomponents/Events";
import Goals from "./components/Shared Subcomponents/Goals";
import Schedule from "./components/Shared Subcomponents/Schedule";
import PlanningTitle from "./components/Shared Subcomponents/PlanningTitle";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={MonthCalendar} />
        <Route
          path="/:year/:month/plan"
          exact
          render={props => (
            <PlanningPage
              title={
                <PlanningTitle
                  className="planning__title"
                  params={props.match.params}
                />
              }
              events={<Events className="planning__section planning__events" />}
              goals={<Goals className="planning__section planning__goals" />}
              schedule={
                <Schedule className="planning__section planning__schedule" />
              }
            />
          )}
        />
        <Route path="/:year/week/:week" exact component={WeekCalendar} />
        <Route
          path="/:year/week/:week/plan"
          render={props => (
            <PlanningPage
              title={
                <PlanningTitle
                  className="planning__title"
                  params={props.match.params}
                />
              }
              events={<Events className="planning__section planning__events" />}
              goals={<Goals className="planning__section planning__goals" />}
              schedule={
                <Schedule className="planning__section planning__schedule" />
              }
            />
          )}
        />
        <Route
          path="/:year/:month/:day"
          render={props => (
            <PlanningPage
              title={
                <PlanningTitle
                  className="planning__title"
                  params={props.match.params}
                />
              }
              events={<Events className="planning__section planning__events" />}
              goals={<Goals className="planning__section planning__goals" />}
              schedule={
                <Schedule className="planning__section planning__schedule" />
              }
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
