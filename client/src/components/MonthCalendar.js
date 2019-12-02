import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import Picker from "./MonthCalendar Subcomponents/Picker";
import Table from "./MonthCalendar Subcomponents/Table";

var delayed;
export default class MonthCalendar extends Component {
  state = {
    monthToShow: new Date().getMonth(),
    yearToShow: new Date().getFullYear()
  };
  render() {
    const dateToShow = new Date(this.state.yearToShow, this.state.monthToShow);
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
        <button
          className="month__btn jumpBtn"
          value={-1}
          onClick={this.jumpToMonth}
        >
          ◀
        </button>
        <h1 className="month__title">{format(dateToShow, "MMMM y")}</h1>
        <button
          className="month__btn jumpBtn"
          value={1}
          onClick={this.jumpToMonth}
        >
          ▶
        </button>
        <Table className="month__table" month={dateToShow} />
        <Picker
          className="month__picker"
          pickMonth={this.pickMonth}
          pickYear={this.pickYear}
        />
      </div>
    );
  }

  pickMonth = selectedMonth => {
    this.setState({ monthToShow: selectedMonth.value });
  };

  pickYear = typed => {
    let yearToShow = typed.target.value;
    clearTimeout(delayed);
    delayed = setTimeout(() => {
      this.setState({ yearToShow: yearToShow });
    }, 1000);
  };

  jumpToMonth = click => {
    click.preventDefault();
    let monthToShow = this.state.monthToShow + Number(click.target.value);
    if (monthToShow >= 12) {
      monthToShow = monthToShow - 12;
      this.setState({ yearToShow: this.state.yearToShow + 1 });
    }
    if (monthToShow < 0) {
      monthToShow = monthToShow + 12;
      this.setState({ yearToShow: this.state.yearToShow - 1 });
    }
    this.setState({ monthToShow: monthToShow });
  };
}
