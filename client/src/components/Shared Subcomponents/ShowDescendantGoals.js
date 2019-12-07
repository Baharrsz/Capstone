import React from "react";
import uuid from "uuid";

export default function ShowDescendantGoals({ descendants }) {
  //Creating html for showing descendant events
  const descendantsElements = Object.keys(descendants).map(
    descendantArrayName => {
      if (descendants[descendantArrayName]) {
        const descendantArray = descendants[descendantArrayName];
        return (
          <div className="planning__transferred">
            <h4 className="planning__transferred-title">{`${descendantArrayName} goals`}</h4>
            <div className="planning__transferred__collection">
              {descendantArray.map(descendant => {
                const goals = Object.values(descendant.goals);
                return (
                  <div
                    className="planning__transferred__collection-item"
                    key={uuid()}
                  >
                    <h5 className="planning__transferred-title">
                      {descendant.id}
                    </h5>
                    <div className="planning__transferred-list">
                      {goals.map(goal => {
                        return (
                          <div className="planning__transferred-list-item-value">
                            {goal}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    }
  );

  return (
    <div className="planning-goals-descendants planning-section-descendants">
      {descendantsElements}
    </div>
  );
}
