import React, { Component } from "react";
import TimePicker from "./TimePicker";
import uuid from "uuid";
import TimeAndDuration from "./TimeAndDuration";

var delayed;
export default class MainSchedule extends Component {
  constructor(props) {
    super(props);
  }
  state = { start: undefined, end: undefined, duration: undefined };
  render() {
    //The list of schedule items previously added to the database
    const scheduleKeys = Object.keys(this.props.mainSchedule);
    const scheduleRows = scheduleKeys.map(key => {
      const scheduleItem = this.props.mainSchedule[key];
      const scheduleItemKeys = Object.keys(scheduleItem);
      const scheduleRow = scheduleItemKeys.map(scheduleItemKey => {
        return (
          <input
            className={`planning__main-scheduleRow-input planning__main-scheduleRow-${scheduleItemKey}`}
            name={scheduleItemKey}
            defaultValue={scheduleItem[scheduleItemKey]}
            key={uuid()}
          />
        );
      });
      return (
        <form className="planning__main-scheduleRow" key={uuid()} id={key}>
          <input
            className="planning__main-scheduleRow-input planning__main-scheduleRow-order"
            disabled
            value={key}
          />
          {scheduleRow}
          <button
            className="planning__main-scheduleRow-btn planning__btn planning__btn--delete"
            type="button"
            form={key}
            onClick={this.props.deleteScheduleItem}
          ></button>
        </form>
      );
    });

    return (
      <div className="planning__main--schedule planning__main">
        <div className="planning__main-schedule-rows">
          <div className="planning__main-scheduleRow planning__main-scheduleRow--header">
            <div className="planning__main-schedule-header-item planning__main-scheduleRow-item">
              Item
            </div>
            <div className="planning__main-schedule-header-item planning__main-scheduleRow-starts">
              Starts
            </div>
            <div className="planning__main-schedule-header-item planning__main-scheduleRow-ends">
              Ends
            </div>
            <div className="planning__main-schedule-header-item planning__main-scheduleRow-duration">
              Duration
            </div>
          </div>
          {scheduleRows}
        </div>

        <form
          className="planning__main-scheduleRow planning__main-scheduleRow--new"
          onSubmit={this.props.addNewScheduleItem}
        >
          <input
            className="planning__main-scheduleRow-input planning__main-scheduleRow-order"
            name="order"
            disabled
            value={Object.keys(this.props.mainSchedule).length + 1}
          />

          <div className="planning__main-scheduleRow-input planning__main-scheduleRow-item">
            <label className="planning__main-schedule-label">item</label>
            <input
              className="planning__main-schedule-value"
              name="item"
              required
            />
          </div>

          <TimeAndDuration
            className="planning__main-scheduleRow-timeInfo"
            sendTimeAndDuration={this.sendTimeAndDuration}
            getDurationInput={this.getDurationInput}
            name="timeInfo"
            id="timeInfo"
            value={this.state}
            params={this.props.params}
          />
          {/* <TimePicker /> */}

          <button className="planning__main-scheduleRow-btn planning__btn planning__btn--add"></button>
        </form>
      </div>
    );
  }

  //   changeStart = startTime => {
  //     clearTimeout(delayed);
  //     delayed = setTimeout(() => {
  //       //   const parts = startTime.split(":");
  //       //   const endTime = `${Number(parts[0]) + 1}:${parts[1]}`;
  //       this.setState({ startTime });
  //     }, 500);
  //   };

  //   changeEnd = endTime => {
  //     clearTimeout(delayed);
  //     delayed = setTimeout(() => {
  //       this.setState({ endTime });
  //     }, 500);
  //   };

  sendTimeAndDuration = (start, end, duration) => {
    this.setState({ start, end, duration });
  };

  getDurationInput = typed => {
    this.setState({ duration: typed.target.value });
  };
}
