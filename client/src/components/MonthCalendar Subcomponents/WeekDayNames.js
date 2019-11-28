import React from "react";
import { format, startOfWeek, addDays } from "date-fns";
import uuid from "uuid";

export default function WeekDayNames(props) {
  const firstDay = startOfWeek(new Date(), {
    weekStartsOn: props.weekStartsOn
  });
  let weekDays = [];
  for (let i = 0; i <= 6; i++)
    weekDays.push(
      <div className={`${props.className}-day`} key={uuid()}>
        {format(addDays(firstDay, i), "E")}
      </div>
    );

  return <div className={props.className}>{weekDays}</div>;
}
