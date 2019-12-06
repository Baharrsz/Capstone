import React from "react";
import uuid from "uuid";

export default function DescendantEvents({ descendants }) {
  //Creating html for showing descendant events
  const descendantsEvents = Object.keys(descendants).map(
    descendantArrayName => {
      if (descendants[descendantArrayName]) {
        const descendantArray = descendants[descendantArrayName];
        return (
          <div className="planning__transferred">
            <h4 className="planning__transferred__collection-title">{`${descendantArrayName} Events`}</h4>
            <div className="planning__transferred__collection">
              {descendantArray.map(descendant => {
                const events = Object.values(descendant.events);
                return (
                  <div
                    className="planning__transferred__collection-item"
                    key={uuid()}
                  >
                    <h5 className="planning__transferred__collection-item-title">
                      {descendant.id}
                    </h5>
                    <div className="planning__transferred__collection-item-list">
                      {events.map(event => {
                        return Object.keys(event).map(key => {
                          return (
                            <div className="planning__transferred-events">
                              <label className="planning__transferred-events-label">
                                {key}
                              </label>
                              <div className="planning__transferred-events-value">
                                {event[key]}
                              </div>
                            </div>
                          );
                        });
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
    <div className="planning-events-descendants planning-section-descendants">
      {descendantsEvents}
    </div>
  );
}
