import React from "react";
import { parse, format } from "date-fns";

export default function DayInWeek(props) {
  const [year, week, day] = props.dayToShow;
  console.log("dayToShow", `${week}/${String(day + 1)}`);
  const dateToShow = parse(
    `${year}/${week}/${String(day + 1)}`,
    "Y/w/e",
    new Date(),
    { weekStartsOn: props.weekStartsOn }
  );
  console.log("dateToShow", dateToShow);
  return (
    <div>
      <h1 className={`${props.className}-title`}>
        {format(dateToShow, "EEEE, d, MMM")}
      </h1>
    </div>
  );
}
