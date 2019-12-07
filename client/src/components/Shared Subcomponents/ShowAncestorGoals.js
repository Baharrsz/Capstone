import React from "react";
import uuid from "uuid";

export default function ShowAncestorGoals({ ancestors }) {
  const ancestorsElements = Object.keys(ancestors).map(ancestor => {
    if (ancestors[ancestor]) {
      const ancestorGoals = Object.values(ancestors[ancestor].goals);
      return (
        <div className="planning__transferred" key={uuid()}>
          <h4 className="planning__transferred-title">{`${ancestor} goals`}</h4>
          <div className="planning__transferred-list">
            {ancestorGoals.map(ancestorGoal => {
              return (
                <div className="planning__transferred-list-item" key={uuid()}>
                  {ancestorGoal.goal}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  });
  return (
    <div className="planning__ancestors--goals planning__ancestors">
      {ancestorsElements}
    </div>
  );
}
