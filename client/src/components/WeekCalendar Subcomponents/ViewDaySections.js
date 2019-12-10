import React from "react";
import uuid from "uuid";

export default function ViewDaySections({ data, section }) {
  //events = {id : event}
  //each event = {name, starts,ends,location}
  //each scheduleItem ={item:starts,ends, duration,order}
  let elements = [];
  if (data) {
    data = Object.values(data);
    elements = data.map(datum => {
      return (
        <div className="planning__transferred-list-item" key={uuid()}>
          {Object.keys(datum).map(key => {
            return (
              <div
                className={`weekcal__day-feature planning__transferred-list-item-key planning__transferred-list-item--${key}`}
                key={uuid()}
              >
                <label className="weekcal__day-feature-label">{key}</label>
                <div className="weekcal__day-feature-value">{datum[key]}</div>
              </div>
            );
          })}
        </div>
      );
    });
  }

  return (
    <section className={`weekcal__day-section weekcal__day-${section}`}>
      <h3 className="weekcal__day-section-title">{section}</h3>
      <div className="weekcal__day-section-body planning__transferred-list">
        {elements}
      </div>
    </section>
  );
}
