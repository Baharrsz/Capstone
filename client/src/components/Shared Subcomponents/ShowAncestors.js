import React from "react";
import uuid from "uuid";

export default function ShowAncestors({ ancestors, section }) {
  const ancestorsElements = Object.keys(ancestors).map(ancestor => {
    if (ancestors[ancestor]) {
      const ancestorItems = Object.values(ancestors[ancestor][section]);
      return (
        <div className="planning__transferred" key={uuid()}>
          <h4 className="planning__transferred-title">{`${ancestor} ${section}`}</h4>
          <div className="planning__transferred-list">
            {ancestorItems.map(ancestorItem => {
              return Object.keys(ancestorItem).map(key => {
                return (
                  <div className="planning__transferred-list-item" key={uuid()}>
                    <label className="planning__transferred-list-item-label">
                      {key}
                    </label>

                    <div className="wplanning__transferred-list-item-value">
                      {ancestorItem[key]}
                    </div>
                  </div>
                );
              });
            })}
          </div>
        </div>
      );
    }
  });
  return (
    <div className={`planning-${section}-ancestors planning-section-ancestors`}>
      {ancestorsElements}
    </div>
  );
}
