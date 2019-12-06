import React, { Component } from "react";
import ShowAncestorEvents from "./ShowAncestorEvents";
import ShowDescendantEvents from "./ShowDescendantEvents";

export default class EditEvents extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { ancestors, descendants, main } = this.props.savedPlans;

    return (
      <div className="planning__events">
        <h3 className="planning__section-title">Events</h3>
        <div className="planning-events-ancestors planning-section-ancestors">
          <ShowAncestorEvents ancestors={ancestors} />
        </div>
        <div className="planning-events-descendants planning-section-descendants">
          <ShowDescendantEvents descendants={descendants} />
        </div>
      </div>
    );
  }
}
