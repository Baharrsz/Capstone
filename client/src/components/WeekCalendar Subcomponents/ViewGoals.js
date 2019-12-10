import React from "react";
import uuid from "uuid";

export default function ViewGoals({ goals }) {
  //goals = {id : goal}
  //each goal = {name, checked,focus}
  let elements = [];
  if (goals) {
    goals = Object.values(goals);
    elements = goals.map(goal => {
      return (
        <div
          className="weekcal__day-feature planning__transferred-list-item"
          key={uuid()}
        >
          <div className="planning__transferred-list-item--label">
            <input
              className="planning__transferred-list-item--check"
              type="checkbox"
              checked={goal.checked === "true"}
            ></input>
            {goal.goal}
          </div>
        </div>
      );
    });
  }
  return (
    <section className="weekcal__day-section weekcal__day-Goals">
      <h3 className="weekcal__day-section-title">Goals</h3>
      <div className="weekcal__day-section-body planning__transferred-list">
        {elements}
      </div>
    </section>
  );
}
