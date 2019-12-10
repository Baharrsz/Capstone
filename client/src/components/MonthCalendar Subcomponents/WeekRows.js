import React from "react";
import {
  startOfMonth,
  format,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  isBefore,
  addDays,
  subDays,
  isSameMonth,
  isSameDay
} from "date-fns";
import { Link } from "react-router-dom";
import uuid from "uuid";

export default function WeekRows(props) {
  const firstDay = startOfWeek(startOfMonth(props.month), {
    weekStartsOn: props.weekStartsOn
  });
  const lastDay = endOfWeek(endOfMonth(props.month), {
    weekStartsOn: props.weekStartsOn
  });
  let day = firstDay;

  let rows = [];
  while (isBefore(day, lastDay)) {
    let row = [];
    for (let i = 1; i <= 7; i++) {
      row.push(
        <Link
          to={`${format(day, "y/M/d")}/plan`}
          className={`${props.className}-week-day ${
            isSameMonth(day, props.month) ? "enabled" : "disabled"
          } ${isSameDay(day, new Date()) ? "today" : "notToday"}`}
          key={uuid()}
        >
          <div className="monthcal__table-week-day-date">
            {format(day, "eee")}
          </div>
          <div className="monthcal__table-week-day-date">
            {format(day, "d")}
          </div>
        </Link>
      );
      day = addDays(day, 1);
    }
    row = (
      <div className={`${props.className}-week`} key={uuid()}>
        <Link
          to={`/${format(subDays(day, 1), "y")}/week/${format(
            subDays(day, 1),
            "w",
            {
              weekStartsOn: props.weekStartsOn
            }
          )}`}
          className={`monthcal__table-week-select`}
        >
          <button className="monthcal__table-week-select-btn"></button>
        </Link>
        {row}
      </div>
    );
    rows.push(row);
  }
  return <div className={`${props.className}-weeks`}>{rows}</div>;
}
