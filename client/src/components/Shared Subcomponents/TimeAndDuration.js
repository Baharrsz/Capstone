import React, { Component } from "react";
import TimePicker from "./TimePicker";
import { format } from "date-fns";

export default class TimeAndDuration extends Component {
  constructor(props) {
    super(props);
  }
  state = { start: undefined, end: undefined, duration: "0" };
  render() {
    return (
      <div className={`${this.props.className}`} id={this.props.id}>
        <TimePicker
          className={`${this.props.className}--start`}
          label="start"
          changeParentState={this.setTime}
        />
        <TimePicker
          className={`${this.props.className}--end`}
          label="end"
          changeParentState={this.setTime}
        />

        <div className={`${this.props.className}-duration`}>
          <label className={`${this.props.className}-duration-label`}>
            duration
          </label>
          <input
            className={`${this.props.className}-duration-input`}
            placeholder={this.state.duration}
            onKeyUp={this.props.getDurationInput}
            name="check"
          />
        </div>
      </div>
    );
  }

  setTime = (label, value) => {
    this.setState({ [label]: value }, () => {
      if (this.state.start && this.state.end) {
        let duration = (this.state.end - this.state.start) / 60000;
        let hr = Math.floor(duration / 60);
        hr = hr < 10 ? `0${hr}` : hr;
        let min = duration - hr * 60;
        min = min < 10 ? `0${min}` : min;

        duration = `${hr}:${min}`;
        this.setState({ duration });

        const start = format(this.state.start, "HH:mm");
        const end = format(this.state.end, "HH:mm");
        this.props.sendTimeAndDuration(start, end, duration);
      }
    });
  };
}
