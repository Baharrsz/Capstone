import React, { Component } from "react";
import { parse, format } from "date-fns";
import { Link } from "react-router-dom";

import Events from "../Shared Subcomponents/Events";
import Goals from "../Shared Subcomponents/Goals";
import Schedule from "../Shared Subcomponents/Schedule";

export default class DayInWeek extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const [year, week, day] = this.props.dayToShow;
    const dateToShow = parse(
      `${year}/${week}/${String(day + 1)}`,
      "Y/w/e",
      new Date(),
      { weekStartsOn: this.props.weekStartsOn }
    );
    return (
      <Link to={`/${format(dateToShow, "y/M/d")}`} className="weekcal__day">
        <h2 className="weekcal__day-title">
          {format(dateToShow, "EEEE MMM do")}
        </h2>

        <Events className="weekcal__day-section weekcal__day-events" />
        <Goals className="weekcal__day-section weekcal__day-goals" />
        <Schedule className="weekcal__day-section weekcal__day-schedule" />
      </Link>
    );
  }
}
