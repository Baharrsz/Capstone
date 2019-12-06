import React from "react";
import uuid from "uuid";

export default function ShowAncestors({ ancestors }) {
  const ancestorsEvents = Object.keys(ancestors).map(ancestor => {
    if (ancestors[ancestor]) {
      const events = Object.values(ancestors[ancestor].events);
      return (
        <div className="planning__section-transferred" key={uuid()}>
          <h4 className="planning__section-transferred__title">{`${ancestor} Events`}</h4>
          <div className="planning__section-transferred__items">
            {events.map(event => {
              return Object.keys(event).map(key => {
                return (
                  <div className="planning__section-transferred-events">
                    <label className="planning__section-transferred-events-title">
                      {key}
                    </label>
                    <div className="wplanning__section-transferred-events-value">
                      {event[key]}
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
  return ancestorsEvents;
}
