import React from "react";
import uuid from "uuid";

export default function AncestorEvents({ ancestors }) {
  const ancestorsEvents = Object.keys(ancestors).map(ancestor => {
    if (ancestors[ancestor]) {
      const events = Object.values(ancestors[ancestor].events);
      return (
        <div className="planning__transferred" key={uuid()}>
          <h4 className="planning__transferred-title">{`${ancestor} Events`}</h4>
          <div className="planning__transferred-items">
            {events.map(event => {
              return Object.keys(event).map(key => {
                return (
                  <div className="planning__transferred-events" key={uuid()}>
                    <label className="planning__transferred-events-label">
                      {key}
                    </label>
                    <div className="wplanning__transferred-events-value">
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
  return (
    <div className="planning-events-ancestors planning-section-ancestors">
      {ancestorsEvents}
    </div>
  );
}
