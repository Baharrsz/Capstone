import React from "react";
import { parse, format } from "date-fns";

export default function PlanningTitle(props) {
  const { year, month, week, day } = props.params;
  console.log(year, month, week, day);
  const title = week
    ? `Week ${week} of ${year}`
    : day
    ? `${format(
        parse(`${year}/${month}/${day}`, "y/M/d", new Date()),
        "eeee, MMM do y"
      )}`
    : `${format(parse(`${year}/${month}`, "y/M", new Date()), "MMMM y")}`;
  return <h2 className={props.className}>{title}</h2>;
}
