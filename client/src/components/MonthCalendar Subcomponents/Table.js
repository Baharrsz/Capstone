import React from "react";

import WeekDayNames from "./WeekDayNames";
import WeekRows from "./WeekRows";

export default function Table(props) {
  return (
    <div className={props.className}>
      <WeekDayNames className={`${props.className}-header`} weekStartsOn="1" />
      <WeekRows
        className={`${props.className}-weeks`}
        month={props.month}
        weekStartsOn="1"
      />
    </div>
  );
}
