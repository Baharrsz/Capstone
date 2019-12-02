import React from "react";
import DayInWeek from "./DayInWeek";

export default function AllDaysInWeek(props) {
  const allDays = [...Array(7).keys()].map(i => {
    return (
      <DayInWeek
        className={`${props.className}-day`}
        dayToShow={[...props.weekToShow, i]}
        weekStartsOn="1"
      />
    );
  });
  return <div className={props.className}>{allDays}</div>;
}
