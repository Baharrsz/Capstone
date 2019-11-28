import React, { Component } from "react";
// import dateFns from "date-fns";
import Picker from "./MonthCalendar Subcomponents/Picker";
import Table from "./MonthCalendar Subcomponents/Table";

export default class MonthCalendar extends Component {
  state = {};
  render() {
    return (
      <div className="month">
        <button className="month__btn">PLAN IT!</button>
        <Table className="month__table" />
        <Picker className="month__picker" />
      </div>
    );
  }
}
