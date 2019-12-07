import React from "react";
import uuid from "uuid";

export default function ShowAncestorGoals({ ancestors }) {
  const ancestorsElements = Object.keys(ancestors).map(ancestor => {
    if (ancestors[ancestor]) {
      const ancestorItems = Object.values(ancestors[ancestor].goals);
      return (
        <div className="planning__transferred" key={uuid()}>
          <h4 className="planning__transferred-title">{`${ancestor} goals`}</h4>
          <div className="planning__transferred-list">
            {ancestorItems.map(ancestorItem => {
              return (
                <div className="planning__transferred-list-item" key={uuid()}>
                  {ancestorItem}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  });
  return (
    <div className="planning-goals-ancestors planning-section-ancestors">
      {ancestorsElements}
    </div>
  );
}
