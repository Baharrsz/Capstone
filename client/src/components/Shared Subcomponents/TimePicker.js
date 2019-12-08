import React, { Component } from "react";
import Select from "react-select";
import { parse, format } from "date-fns";

//props to this component:
//className, if month/week/day, if duration
export default class TimePicker extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    hour: "12",
    minute: "00",
    ampm: "a.m."
  };
  render() {
    const label = this.props.label;
    let hours = [];
    for (let i = 1; i <= 12; i++) {
      hours.push({ value: i, label: String(i) });
    }
    let minutes = [];
    for (let i = 0; i <= 11; i++) {
      minutes.push({ value: i * 5, label: String(i * 5) });
    }
    const ampm = [
      { value: "a.m.", label: "a.m." },
      { value: "p.m.", label: "p.m." }
    ];
    return (
      <div className={`${this.props.className} time-picker`}>
        <label className={`time-picker-label`}>{label}</label>
        <div className={`time-picker-input`}>
          <Select
            className={`time-picker-input-hour`}
            options={hours}
            name="hour"
            onChange={this.setTime}
          />
          <span className={`time-picker-input-divider`}>:</span>
          <Select
            className={`time-picker-input-minute`}
            options={minutes}
            name="minute"
            onChange={this.setTime}
          />
          <Select
            className={`time-picker-input-ampm`}
            options={ampm}
            name="ampm"
            onChange={this.setTime}
          />
        </div>
      </div>
    );
  }

  setTime = (selected, meta) => {
    const name = meta.name;
    let time = this.state;
    time[name] = selected.value;
    time.time = parse(
      `${time.hour}:${time.minute}-${time.ampm}`,
      "h:m-aaaa",
      new Date()
    );
    this.setState({ ...time }, () => {
      this.props.changeParentState(this.props.label, time.time);
    });
  };
}
