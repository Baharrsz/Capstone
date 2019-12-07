import React, { Component } from "react";
import uuid from "uuid";

export default class MainGoals extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let focusedGoals = [];
    let notFocusedGoals = [];

    for (let key in this.props.mainGoals) {
      const goal = this.props.mainGoals[key];
      const goalHtml = (
        <form className="planning__main-goal" key={uuid()} id={goal.id}>
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
            form={goal.id}
            value={goal.focus === "notFocus" ? "focus" : "notFocus"}
            onClick={this.props.changeFocus}
          >
            {goal.focus === "notFocus" ? "focus" : "Remove focus"}
          </button>
          <button
            className="planning__main-goal-btn planning__main-goal-btn--delete planning__btn--delete"
            type="button"
            form={goal.id}
            onClick={this.props.deleteGoal}
          >
            Delete
          </button>
        </form>
      );
      if (goal.focus === "focus") {
        focusedGoals.push(goalHtml);
      } else {
        notFocusedGoals.push(goalHtml);
      }
    }

    return (
      <div className="planning__main planning__main--goals">
        <div className="planning__main-goals">
          <div className="planning__main-goals--focused"> {focusedGoals}</div>
          {notFocusedGoals}
        </div>

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
