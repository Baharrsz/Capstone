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
        <form className="planning__main-goal" key={uuid()} id={key}>
          <label className="planning__main-goal-label">
            <input
              className="planning__main-goal-check"
              type="checkbox"
              checked={goal.checked === "true"}
            ></input>
            {goal.goal}
          </label>
          <button
            className="planning__main-goal-btn planning__main-goal-btn--delete planning__btn--delete"
            type="button"
            form={key}
            onClick={this.props.addFocus}
          >
            Focus
          </button>
          <button
            className="planning__main-goal-btn planning__main-goal-btn--delete planning__btn--delete"
            type="button"
            form={key}
            onClick={this.props.deleteGoal}
          >
            Delete
          </button>
        </form>
      );
    });
    return (
      <div className="planning__main planning__main--goals">
        {goalsList}
        <form
          className="planning__main-goal planning__main-goal--new"
          onSubmit={this.props.addNewGoal}
        >
          <input
            className="planning__main-goal--new-input"
            name="goal"
            placeholder="Add a new goal"
          />
          <button className="planning__main-goal-btn planning__btn--add">
            Add
          </button>
        </form>
      </div>
    );
  }
}
