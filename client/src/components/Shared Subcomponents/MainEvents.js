import React, { Component } from "react";
import { format } from "date-fns";
// import TimePicker from "react-time-picker";
import TimePicker from "./TimePicker";
import uuid from "uuid";

var delayed;
export default class MainEvents extends Component {
  constructor(props) {
    super(props);
  }
  state = { starts: undefined, ends: undefined };
  render() {
    //The list of events previously added to the database
    let eventsList;
    if (this.props.mainEvents) {
      const eventsKeys = Object.keys(this.props.mainEvents);
      eventsList = eventsKeys.map(key => {
        const event = this.props.mainEvents[key];
        return (
          <form className="planning__main-event" key={uuid()} id={key}>
            <div
              className={`planning__main-event-item planning__main-event-item--event`}
            >
              <label className="planning__main-event-label">event</label>
              <input
                className="planning__main-event-value"
                name="event"
                defaultValue={event.event}
              />
            </div>

            <div
              className={`planning__main-event-item planning__main-event-item--starts`}
            >
              <label className="planning__main-event-label">starts</label>
              <input
                className="planning__main-event-value"
                name="starts"
                defaultValue={event.starts}
              />
            </div>

            <div
              className={`planning__main-event-item planning__main-event-item--ends`}
            >
              <label className="planning__main-event-label">ends</label>
              <input
                className="planning__main-event-value"
                name="ends"
                defaultValue={event.ends}
              />
            </div>

            <div
              className={`planning__main-event-item planning__main-event-item--location`}
            >
              <label className="planning__main-event-label">location</label>
              <input
                className="planning__main-event-value"
                name="location"
                defaultValue={event.location}
              />
            </div>

            <div
              className={`planning__main-event-item planning__main-event-item--buttons`}
            >
              <button className="planning__main-event-btn planning__btn planning__btn--copy"></button>
              <button
                className="planning__main-event-btn planning__btn planning__btn--delete"
                type="button"
                form={key}
                onClick={this.props.deleteEvent}
              ></button>
            </div>
          </form>
        );
      });
    }

    return (
      <div className="planning__main--events planning__main">
        {eventsList}
        <form
          className="planning__main-event planning__main-event--new"
          onSubmit={this.props.addNewEvent}
        >
          {/* <label className="planning__main-event-label">starts</label> */}
          <TimePicker
            className="planning__main-event-item planning__main-event-item--starts"
            label="starts"
            params={this.props.params}
            changeParentState={this.setTime}
            required
          />

          {/* <label className="planning__main-event-label">ends</label> */}
          <TimePicker
            className="planning__main-event-item planning__main-event-item--ends"
            label="ends"
            params={this.props.params}
            changeParentState={this.setTime}
            required
          />
          <div
            className={`planning__main-event-item planning__main-event-item--event`}
          >
            <label className="planning__main-event-label">event</label>
            <input
              className="planning__main-event-value"
              name="event"
              required
            />
          </div>

          <div
            className={`planning__main-event-item planning__main-event-item--location`}
          >
            <label className="planning__main-event-label">location</label>
            <input
              className="planning__main-event-value"
              name="location"
              defaultValue=""
            />
          </div>

          <button className="planning__main-event--new-btn planning__btn planning__btn--add"></button>
        </form>
      </div>
    );
  }

  // changeStart = startTime => {
  //   clearTimeout(delayed);
  //   delayed = setTimeout(() => {
  //     //   const parts = startTime.split(":");
  //     //   const endTime = `${Number(parts[0]) + 1}:${parts[1]}`;
  //     this.setState({ startTime });
  //   }, 500);
  // };

  // changeEnd = endTime => {
  //   clearTimeout(delayed);
  //   delayed = setTimeout(() => {
  //     this.setState({ endTime });
  //   }, 500);
  // };

  setTime = (label, value) => {
    this.setState({ [label]: value }); ///!!!!HERE
  };
}
