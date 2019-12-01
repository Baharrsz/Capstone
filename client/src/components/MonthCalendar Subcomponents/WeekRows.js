import React from "react";
import {
  startOfMonth,
  format,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  isBefore,
  addDays,
  isSameMonth
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
          // to={`${format(day, "y/MMM/d")}`}
          to="day"
          className={`${props.className}-week-day ${
            isSameMonth(day, props.month) ? "enabled" : "disabled"
          }`}
          key={uuid()}
        >
          {format(day, "E MMM d")}
        </Link>
      );
      day = addDays(day, 1);
    }
    row = (
      <div className={`${props.className}-week`} key={uuid()}>
        <Link
          to={`/${format(day, "y")}/week/${format(day, "I")}`}
          className={`${props.className}-week-btn`}
        >
          Select Week
        </Link>
        {row}
      </div>
    );
    rows.push(row);
  }
  return <div className={`${props.className}`}>{rows}</div>;
}
