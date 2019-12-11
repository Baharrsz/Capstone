import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import Picker from "./MonthCalendar Subcomponents/Picker";
import MonthTable from "./MonthCalendar Subcomponents/MonthTable";

var delayed;
export default class MonthCalendar extends Component {
  state = {
    monthToShow: new Date().getMonth(),
    yearToShow: new Date().getFullYear()
  };
  render() {
    const dateToShow = new Date(this.state.yearToShow, this.state.monthToShow);
    return (
      <div className="monthcal">
        <div className="heading">
          <Link
            to={`${this.state.yearToShow}/${this.state.monthToShow + 1}/plan`}
            className="monthcal__planLink planLink  heading__mainBtn planBtn"
          >
            <button className="monthcal__btn "></button>
          </Link>

          <div className="monthcal__header placard">
            <button
              className="monthcal__header-btn placard__jumpBtn placard__jumpBtn--prev"
              value={-1}
              onClick={this.jumpToMonth}
            ></button>
            <h1 className="monthcal__header-title placard__date">
              {format(dateToShow, "MMMM y")}
            </h1>
            <button
              className="monthcal__header-btn placard__jumpBtn"
              value={1}
              onClick={this.jumpToMonth}
            ></button>
          </div>
        </div>

        <MonthTable className="monthcal__table" month={dateToShow} />
        <Picker
          className="monthcal__picker"
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
