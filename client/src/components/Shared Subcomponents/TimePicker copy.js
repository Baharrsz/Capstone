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
    startHour: "12",
    startMinute: "00",
    startAMPM: "a.m.",
    endHour: "12",
    endMinute: "00",
    endAMPM: "a.m."
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
      <div className={`${this.props.className}`}>
        <label className={`${this.props.className}-label`}>{label}</label>
        <div className={`${this.props.className}-input`}>
          <Select
            className={`${this.props.className}-input-hour`}
            options={hours}
            defaultValue={12}
            name="hour"
            onChange={(selected, meta, sOe = "start") =>
              this.setTime(selected, meta, sOe)
            }
          />
          <span className={`${this.props.className}-input-divider`}>:</span>
          <Select
            className={`${this.props.className}-input-minute`}
            options={minutes}
            defaultValue={0}
            name="minute"
            onChange={(selected, meta, sOe = "start") =>
              this.setTime(selected, meta, sOe)
            }
          />
          <Select
            className={`${this.props.className}-input-ampm`}
            options={ampm}
            defaultValue="a.m."
            name="ampm"
            onChange={(selected, meta, sOe = "start") =>
              this.setTime(selected, meta, sOe)
            }
          />
        </div>
      </div>
    );
  }

  setTime = (selected, meta, sOe) => {
    const name = meta.name;
    let time = this.state;
    time[name] = selected.value;
    time[`${sOe}Time`] = parse(
      `${time.startHour}:${time.startMinute}-${time.startAMPM}`,
      "h:m-aaaa",
      new Date()
    );
    this.setState({ ...time }, () => console.log(this.state));
  };
}
