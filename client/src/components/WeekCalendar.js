import React, { Component } from "react";
import { Link } from "react-router-dom";
import AllDaysInWeek from "./WeekCalendar Subcomponents/AllDaysInWeek";

export default class WeekCalendar extends Component {
  state = {
    weekToShow: [
      Number(this.props.match.params.year),
      Number(this.props.match.params.week)
    ]
  };
  render() {
    const weekToShow = this.state.weekToShow;
    return (
      <div>
        <button className="weekcal__btn planBtn">
          <Link
            to={`/${weekToShow[0]}/week/${weekToShow[1]}/plan`}
            className="weekcal__planLink planLink"
          >
            Plan it!
          </Link>
        </button>
        <section className="weekcal__header calendar__header">
          <button
            className="weekcal__header-btn jumpBtn"
            value={-1}
            onClick={this.jumpToWeek}
          >
            ◀
          </button>
          <h1 className="weekcal__header-title jumpBtn">{`Week ${weekToShow[1]} of ${weekToShow[0]}`}</h1>
          <button
            className="weekcal__header-btn jumpBtn"
            value={1}
            onClick={this.jumpToWeek}
          >
            ▶
          </button>
        </section>

        <AllDaysInWeek className="weekcal__days" weekToShow={weekToShow} />
      </div>
    );
  }

  jumpToWeek = click => {
    click.preventDefault();
    let weekToShow = this.state.weekToShow;
    weekToShow[1] = weekToShow[1] + Number(click.target.value);
    if (weekToShow[1] > 52) {
      weekToShow[1] = weekToShow[1] - 52;
      weekToShow[0] = weekToShow[0] + 1;
    }
    if (weekToShow[1] <= 0) {
      weekToShow[1] = weekToShow[1] + 52;
      weekToShow[0] = weekToShow[0] - 1;
    }
    this.setState({ weekToShow: weekToShow });
  };
}
