import React, { Component } from "react";
import AncestorEvents from "./ShowAncestors";
import DescendantEvents from "./ShowDescendants";
import MainEvents from "./MainEvents";

export default class EditGoals extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { ancestors, descendants, main } = this.props.savedPlans;

    return (
      <div className="planning__goals planning__section">
        <h3 className="planning__section-title">Goals</h3>
        <AncestorEvents ancestors={ancestors} />
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
