import React, { Component } from "react";
import { Link } from "react-router-dom";

import Picker from "./MonthCalendar Subcomponents/Picker";
import Table from "./MonthCalendar Subcomponents/Table";

var delayed;
export default class MonthCalendar extends Component {
  state = {
    monthToShow: new Date().getMonth(),
    yearToShow: new Date().getFullYear()
  };
  render() {
    return (
      <div className="month">
        <button className="month__btn planBtn">
          <Link
            to={`${this.state.yearToShow}/${this.state.monthToShow}/plan`}
            className="month__planLink planLink"
          >
            Plan it!
          </Link>
        </button>
        <Table
          className="month__table"
          month={new Date(this.state.yearToShow, this.state.monthToShow)}
        />
        <Picker
          className="month__picker"
          pickMonth={this.pickMonth}
          pickYear={this.pickYear}
        />
      </div>
    );
  }

  pickMonth = selectedMonth => {
    console.log(selectedMonth);
    this.setState({ monthToShow: selectedMonth.value });
  };

  pickYear = typed => {
    let yearToShow = typed.target.value;
    clearTimeout(delayed);
    delayed = setTimeout(() => {
      this.setState({ yearToShow: yearToShow });
    }, 1000);
  };
}
