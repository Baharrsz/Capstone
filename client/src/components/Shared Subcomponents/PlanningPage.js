import React, { Component } from "react";
import axios from "axios";

import PlanningTitle from "./PlanningTitle";
import EditEvents from "./EditEvents";

export default class PlanningPage extends Component {
  constructor(props) {
    super(props);
  }
  state = { main: undefined, ancestors: undefined, descendants: undefined };

  render() {
    return !this.state.main ? (
      <>Loading...</>
    ) : (
      <form className="planning">
        <PlanningTitle
          className="planning__title"
          params={this.props.match.params}
        />
        <button className="planning__btn">Save</button>

        <EditEvents savedPlans={this.state} />
        {this.props.goals}
        {this.props.schedule}
      </form>
    );
  }

  componentDidMount() {
    //Cutting "/paln" from the end of the url
    let url = this.props.match.url.slice(0, -5);
    url = `http://localhost:5000${url}`;
    axios.get(url).then(response => {
      const {
        Days,
        Week,
        Weeks,
        Month,
        Months,
        Year,
        events,
        goals,
        schedule
      } = response.data;
      const main = { events, goals, schedule };
      const ancestors = { Year, Month, Week };
      const descendants = { Months, Weeks, Days };
      // console.log("ancestors", ancestors);
      // console.log("descendents", descendents);
      // console.log("main", main);
      this.setState({ main, ancestors, descendants });
    });
  }
}
