import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format, startOfWeek, addDays, parse } from "date-fns";
import AllDaysInWeek from "./WeekCalendar Subcomponents/AllDaysInWeek";

export default class WeekCalendar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const weekToShow = [
      this.props.match.params.year,
      this.props.match.params.week
    ];

    return (
      <div>
        <Link to="day">Day</Link>
        <button className="weekcal__btn planBtn">
          <Link
            to={`/${weekToShow[0]}/week/${weekToShow[1]}/plan`}
            className="week__planLink planLink"
          >
            Plan it!
          </Link>
        </button>
        <h1>{`Week ${weekToShow[1]} of ${weekToShow[0]}`}</h1>
        <AllDaysInWeek className="week__days" weekToShow={weekToShow} />
        <button>Prev</button>
        <button>Next</button>
      </div>
    );
  }
}
