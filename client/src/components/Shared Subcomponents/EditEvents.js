import React, { Component } from "react";
import AncestorEvents from "./AncestorEvents";
import DescendantEvents from "./DescendantEvents";
import MainEvents from "./MainEvents";

export default class EditEvents extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { ancestors, descendants, main } = this.props.savedPlans;

    return (
      <div className="planning__events">
        <h3 className="planning__section-title">Events</h3>
        <AncestorEvents ancestors={ancestors} />
        <MainEvents main={main} />
        <DescendantEvents descendants={descendants} />
      </div>
    );
  }
}
