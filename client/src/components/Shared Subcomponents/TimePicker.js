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
    const { year, month, week, day } = this.props.params;
    const type = week ? "week" : day ? "day" : "month";

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

    const weekDays = [
      { value: 1, label: "Monday" },
      { value: 2, label: "Tuesday" },
      { value: 3, label: "Wednesday" },
      { value: 4, label: "Thursday" },
      { value: 5, label: "Friday" },
      { value: 6, label: "Saturday" },
      { value: 7, label: "Sunday" }
    ];

    let daysOrWeeks = [];
    for (let i = 1; i <= 5; i++) {
      daysOrWeeks.push({ value: i - 5, label: `Week ${i}` });
    }
    for (let i = 1; i <= 31; i++) {
      daysOrWeeks.push({ value: i, label: `Day ${i}` });
    }

    return (
      <div className={`${this.props.className} time-picker`}>
        <label className={`time-picker-label`}>{label}</label>
        <div className={`time-picker-input`}>
          <Select
            className={`time-picker-input-hour`}
            options={
              type === "day" ? hours : type === "week" ? weekDays : daysOrWeeks
            }
            name={
              type === "day"
                ? "hour"
                : type === "week"
                ? "weekday"
                : "dayOrWeek"
            }
            onChange={this.setTime}
          />
          {!(type === "day") ? (
            <></>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    );
  }

  setTime = (selected, meta) => {
    const name = meta.name;
    let time = this.state;
    time[name] = selected.value;
    if (name === "hour" || name === "minute" || name === "ampm") {
      time.time = parse(
        `${time.hour}:${time.minute}-${time.ampm}`,
        "h:m-aaaa",
        new Date()
      );
    } else {
      time.time = time[name];
    }

    this.setState({ ...time }, () => {
      this.props.changeParentState(this.props.label, time.time);
    });
  };
}
