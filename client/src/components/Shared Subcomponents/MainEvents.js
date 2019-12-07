import React, { Component } from "react";
import TimePicker from "react-time-picker";
import uuid from "uuid";

var delayed;
export default class MainEvents extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    events: {
      "0900": {
        event: "",
        startsAt: "10:00",
        endsAt: "11:00",
        location: ""
      }
    }
  };
  render() {
    //The list of events previously added to the database
    const events = Object.values(this.props.main.events);
    const eventsList = events.map(event => {
      return (
        <form
          className="planning__main-event"
          key={uuid()}
          id={event.id}
          onSubmit={this.props.deleteEvents}
        >
          <label className="planning__main-event-label">Event</label>
          <input
            className="planning__main-event-value"
            defaultValue={event.event}
          />

          <label className="planning__main-event-label">Starts at</label>
          <input
            className="planning__main-event-value"
            defaultValue={event.startsAt}
          />

          <label className="planning__main-event-label">Ends at</label>
          <input
            className="planning__main-event-value"
            defaultValue={event.endsAt}
          />

          <label className="planning__main-event-label">Location</label>
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
          <label className="planning__main-event-label">Starts at</label>
          <TimePicker
            className="planning__main-event-value"
            value={this.state.startTime}
            name="startsAt"
            onChange={this.changeStart}
            required
          />

          <label className="planning__main-event-label">Ends at</label>
          <div className="planning__main-event-value">
            <TimePicker
              className="planning__main-events-value"
              value={this.state.endTime}
              name="endsAt"
              onChange={this.changeEnd}
              required
            />
          </div>

          <label className="planning__main-event-label">Event</label>
          <input className="planning__main-event-value" name="event" required />

          <label className="planning__main-event-label">Location</label>
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
      const parts = startTime.split(":");
      const endTime = `${Number(parts[0]) + 1}:${parts[1]}`;
      this.setState({ startTime, endTime });
    }, 1000);
  };

  changeEnd = endTime => {
    clearTimeout(delayed);
    delayed = setTimeout(() => {
      const parts = endTime.split(":");
      let startTime = `${Number(parts[0]) - 1}:${parts[1]}`;
      if (startTime.split(":")[0] === "-1") startTime = `11:${parts[1]}`;
      this.setState({ startTime, endTime });
    }, 1000);
  };
}
