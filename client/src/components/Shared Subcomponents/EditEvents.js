import React, { Component } from "react";
import ShowAncestors from "./ShowAncestors";
import ShowDescendants from "./ShowDescendants";

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
          <ShowAncestors ancestors={ancestors} />
        </div>
        <div className="planning-events-descendants planning-section-descendants">
          <ShowDescendants descendants={descendants} />
        </div>
      </div>
    );
  }
}
