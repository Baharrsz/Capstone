import React, { Component } from "react";
import TimePicker from "react-time-picker";
import uuid from "uuid";

var delayed;
export default class MainEvents extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    //The list of events previously added to the database
    const eventKeys = Object.keys(this.props.main.events);
    const eventsList = eventKeys.map(key => {
      const event = this.props.main.events[key];
      return (
        <form
          className="planning__main-event"
          key={uuid()}
          id={key}
          onSubmit={this.props.deleteEvents}
        >
          <label className="planning__main-event-label">event</label>
          <input
            className="planning__main-event-value"
            defaultValue={event.event}
          />

          <label className="planning__main-event-label">starts</label>
          <input
            className="planning__main-event-value"
            defaultValue={event.starts}
          />

          <label className="planning__main-event-label">ends</label>
          <input
            className="planning__main-event-value"
            defaultValue={event.ends}
          />

          <label className="planning__main-event-label">location</label>
          <input
            className="planning__main-event-value"
            defaultValue={event.location}
          />

          <button className="planning__main-event-btn planning__main-event-btn--delete">
            Delete
          </button>
        </form>
      );
    });

    return (
      <div className="planning__main-events">
        {eventsList}
        <form
          className="planning__main-event"
          key={uuid()}
          onSubmit={this.props.addNewEvent}
        >
          <label className="planning__main-event-label">starts</label>
          <TimePicker
            className="planning__main-event-value"
            value={this.state.startTime}
            name="startsAt"
            onChange={this.changeStart}
            required
          />

          <label className="planning__main-event-label">ends</label>
          <div className="planning__main-event-value">
            <TimePicker
              className="planning__main-events-value"
              value={this.state.endTime}
              clockIcon={null}
              name="endsAt"
              onChange={this.changeEnd}
              required
            />
          </div>

          <label className="planning__main-event-label">event</label>
          <input className="planning__main-event-value" name="event" required />

          <label className="planning__main-event-label">location</label>
          <input
            className="planning__main-event-value"
            name="location"
            defaultValue=""
          />

          <button className="planning__main-event-btn">Add</button>
        </form>
      </div>
    );
  }

  changeStart = startTime => {
    clearTimeout(delayed);
    delayed = setTimeout(() => {
      //   const parts = startTime.split(":");
      //   const endTime = `${Number(parts[0]) + 1}:${parts[1]}`;
      this.setState({ startTime });
    }, 500);
  };

  changeEnd = endTime => {
    clearTimeout(delayed);
    delayed = setTimeout(() => {
      this.setState({ endTime });
    }, 500);
  };
}
