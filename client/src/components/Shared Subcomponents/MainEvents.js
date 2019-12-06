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
    const events = Object.values(this.state.events);

    const eventsList = events.map(event => {
      return (
        <div className="planning__main-event" key={uuid()}>
          <label className="planning__main-event-label">Event</label>
          <div className="planning__main-event-value">{event.event}</div>

          <label className="planning__main-event-label">Starts at</label>
          <div className="planning__main-event-value">{event.startsAt}</div>

          <label className="planning__main-event-label">Ends at</label>
          <div className="planning__main-event-value">{event.endsAt}</div>

          <label className="planning__main-event-label">Location</label>
          <div className="planning__main-event-value">{event.location}</div>
        </div>
      );
    });

    return (
      <div className="planning__main-events">
        {eventsList}
        <form
          className="planning__main-event"
          key={uuid()}
          onSubmit={this.addNewEvent}
        >
          <label className="planning__main-event-label">Event</label>
          <input className="planning__main-event-value" required name="event" />

          <label className="planning__main-event-label">Starts at</label>
          <TimePicker
            className="planning__main-event-value"
            value={this.state.startTime}
            name="startTime"
            onChange={this.changeStart}
          />

          <label className="planning__main-event-label">Ends at</label>
          <div className="planning__main-event-value">
            <TimePicker
              className="planning__main-events-value"
              value={this.state.endTime}
              name="endTime"
              onChange={this.changeEnd}
            />
          </div>

          <label className="planning__main-event-label">Location</label>
          <input className="planning__main-event-value" name="location" />

          <button className="planning__main-event-btn">Add</button>
        </form>
      </div>
    );
  }

  addNewEvent = submit => {
    submit.preventDefault();
    console.log("start", submit.target.startTime.value);
    console.log("end", submit.target.endTime);
  };

  changeStart = startTime => {
    clearTimeout(delayed);
    delayed = setTimeout(() => {
      const parts = startTime.split(":");
      const endTime = `${Number(parts[0]) + 1}:${parts[1]}`;
      this.setState({ startTime, endTime }, () => {
        console.log(this.state);
      });
    }, 1500);
  };

  changeEnd = endTime => {
    clearTimeout(delayed);
    delayed = setTimeout(() => {
      const parts = endTime.split(":");
      let startTime = `${Number(parts[0]) - 1}:${parts[1]}`;
      if (startTime.split(":")[0] === "-1") startTime = `11:${parts[1]}`;
      this.setState({ startTime, endTime }, () => {
        console.log(this.state);
      });
    }, 1500);
  };
}
