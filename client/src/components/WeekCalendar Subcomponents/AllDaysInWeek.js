import React from "react";
import DayInWeek from "./DayInWeek";
import uuid from "uuid";

export default function AllDaysInWeek(props) {
  const allDays = [...Array(7).keys()].map(i => {
    return (
      <DayInWeek
        dayToShow={[...props.weekToShow, i]}
        weekStartsOn="1"
        key={uuid()}
      />
    );
  });
  return <div className={props.className}>{allDays}</div>;
}
