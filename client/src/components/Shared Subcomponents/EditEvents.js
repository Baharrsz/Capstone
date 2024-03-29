import React, { Component } from "react";
import ShowAncestors from "./ShowAncestors";
import DescendantEvents from "./ShowDescendants";
import MainEvents from "./MainEvents";

export default class EditEvents extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { ancestors, descendants, main } = this.props.savedPlans;

    return (
      <div className="planning__events planning__section">
        <h3 className="planning__section-title">Events</h3>
        <ShowAncestors ancestors={ancestors} />
        <MainEvents
          main={main}
          deleteEvents={this.props.deleteEvents}
          addNewEvent={this.props.addNewEvent}
        />
        <DescendantEvents descendants={descendants} />
      </div>
    );
  }
}
