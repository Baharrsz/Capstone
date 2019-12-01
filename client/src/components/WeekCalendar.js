import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format, startOfWeek, addDays, parse } from "date-fns";

export default class WeekCalendar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const weekToShow = [
      this.props.match.params.year,
      this.props.match.params.week
    ];
    console.log(
      parse(`${weekToShow[0]}/${weekToShow[1]}/0`, "w/YYYY/d", new Date())
    );
    return (
      <div>
        <Link to="day">Day</Link>
        <button className="weekcal__btn planBtn">
          <Link to="/week-plan" className="week__planLink planLink">
            Plan it!
          </Link>
        </button>
        <h1>{weekToShow}</h1>
        <div className="weekcal__day">
          <h2 className="weekcal__day-title">Day {}</h2>
        </div>
        <button>Prev</button>
        <button>Next</button>
      </div>
    );
  }
}
