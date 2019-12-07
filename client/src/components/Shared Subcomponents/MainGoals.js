import React, { Component } from "react";
import uuid from "uuid";

export default class MainGoals extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const goalsKeys = Object.keys(this.props.mainGoals);
    const goalsList = goalsKeys.map(key => {
      const goal = this.props.mainGoals[key];
      return (
        <label className="planning__main-goal" key={uuid()}>
          <input className="planning__main-goal-check" type="checkbox"></input>
          {goal.goal}
        </label>
      );
    });
    return (
      <div className="planning__main planning__main--goals">{goalsList}</div>
    );
  }
}
