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
          to={`${format(day, "y/M/d")}`}
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
          to={`/${format(subDays(day, 1), "y")}/week/${format(
            subDays(day, 1),
            "w",
            {
              weekStartsOn: props.weekStartsOn
            }
          )}`}
          className={`${props.className}-week-btn`}
        >
          Select Week
        </Link>
        {row}
      </div>
    );
    rows.push(row);
  }
  return <div className={`${props.className}-weeks`}>{rows}</div>;
}
