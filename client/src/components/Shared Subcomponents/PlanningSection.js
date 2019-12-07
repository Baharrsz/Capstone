import React, { Component } from "react";
import ShowAncestors from "./ShowAncestors";
import ShowDescendants from "./ShowDescendants";
import MainEvents from "./MainEvents";

export default class PlanningSection extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={`${this.props.className} planning__section`}>
        <h3 className="planning__section-title">{this.props.sectionTitle}</h3>
        {this.props.ancestorsController}
        {this.props.mainController}
        {this.props.descendantsController}
      </div>
    );
  }
}
