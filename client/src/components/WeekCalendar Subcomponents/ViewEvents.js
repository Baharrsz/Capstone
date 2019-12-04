import React from "react";
import uuid from "uuid";

export default function ViewEvents({ className, events }) {
  let eventsElements = [];
  //events = {starts at : event}
  //each event = {name, startsAt,endsAt,location}
  if (events) {
    events = Object.values(events);
    eventsElements = events.map(event => {
      return Object.keys(event).map(key => {
        return (
          <div className="weekcal__day-feature" key={uuid()}>
            <label className="weekcal__day-feature-label">{key}</label>
            <div className="weekcal__day-feature-value">{event[key]}</div>
          </div>
        );
      });
    });
  }

  return (
    <section className="weekcal__day-section weekcal__day-events">
      <h3 className="weekcal__day-section-title">Events</h3>
      <div className="weekcal__day-section-body">
        {eventsElements}
        {/* <div className="weekcal__day-feature">
          <label className="weekcal__day-feature-label">Event</label>
          <div className="weekcal__day-feature-value"></div>
        </div>

        <div className="weekcal__day-feature">
          <label className="weekcal__day-feature-label">Starts at</label>
          <div className="weekcal__day-feature-value"></div>
        </div>

        <div className="weekcal__day-feature">
          <label className="weekcal__day-feature-label">Ends at</label>
          <div className="weekcal__day-feature-value"></div>
        </div>

        <div className="weekcal__day-feature">
          <label className="weekcal__day-feature-label">Location</label>
          <div className="weekcal__day-feature-value"></div>
        </div> */}
      </div>
    </section>
  );
}
