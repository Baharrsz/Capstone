import React, { Component } from "react";

export default class PlanningPage extends Component {
  render() {
    return (
      <main className="planning">
        {this.props.title}
        {this.props.events}
        {this.props.goals}
        {this.props.schedule}
      </main>
    );
  }
}
