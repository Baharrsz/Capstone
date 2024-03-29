import React, { Component } from "react";
import { parse, format } from "date-fns";
import { Link } from "react-router-dom";
import axios from "axios";

import ViewDaySections from "./ViewDaySections";
import ViewGoals from "./ViewGoals";

export default class DayInWeek extends Component {
  constructor(props) {
    super(props);
    const [year, week, day] = this.props.dayToShow;
    this.dateToShow = parse(
      `${year}/${week}/${String(day + 1)}`,
      "Y/w/e",
      new Date(),
      { weekStartsOn: this.props.weekStartsOn }
    );
    this.dateLink = format(this.dateToShow, "y/M/d");
  }
  state = {
    events: undefined,
    goals: undefined,
    schedule: undefined
  };

  render() {
    return (
      <Link to={`/${this.dateLink}/plan`} className="weekcal__day">
        <h2 className="weekcal__day-title">
          {format(this.dateToShow, "EEEE MMM do")}
        </h2>
        <div className="weekcal__day-sections">
          <ViewDaySections
            className="weekcal__day-section weekcal__day-events"
            data={this.state.events}
            section="Events"
          />
          <ViewGoals
            className="weekcal__day-section weekcal__day-goals"
            goals={this.state.goals}
          />
          <ViewDaySections
            className="weekcal__day-section weekcal__day-events"
            data={this.state.schedule}
            section="Schedule"
          />
        </div>
      </Link>
    );
  }

  componentDidMount() {
    const url = `http://localhost:5000/${this.dateLink}`;
    axios.get(url).then(response => {
      let newState = {};
      Object.keys(this.state).forEach(key => {
        if (response.data && response.data[key]) {
          newState[key] = response.data[key];
        }
      });

      this.setState({ ...newState });
    });
  }
}
