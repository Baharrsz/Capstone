import React from "react";
import uuid from "uuid";

export default function ShowDescendants({ descendants, section }) {
  //Creating html for showing descendant events/schedules
  const descendantsElements = Object.keys(descendants).map(
    descendantArrayName => {
      if (descendants[descendantArrayName]) {
        const descendantArray = descendants[descendantArrayName];
        return (
          <div className="planning__transferred">
            <h4 className="planning__transferred-title">{`${descendantArrayName} ${section}`}</h4>
            <div className="planning__transferred__collection">
              {descendantArray.map(descendant => {
                const descendantItems = Object.values(descendant[section]);
                return (
                  <div
                    className="planning__transferred__collection-item"
                    key={uuid()}
                  >
                    <h5 className="planning__transferred-title">
                      {descendant.id}
                    </h5>
                    <div className="planning__transferred-list">
                      {descendantItems.map(descendantItem => {
                        return Object.keys(descendantItem).map(key => {
                          return (
                            <div className="planning__transferred-list-item">
                              <label className="planning__transferred-list-item-label">
                                {key}
                              </label>

                              <div className="planning__transferred-list-item-value">
                                {descendantItem[key]}
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
    <div
      className={`planning-${section}-descendants planning-section-descendants`}
    >
      {descendantsElements}
    </div>
  );
}
