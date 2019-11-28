import React from "react";
import { format } from "date-fns";
import uuid from "uuid";

export default function Picker(props) {
  let options = [
    <option
      className={`${props.className}-option`}
      disabled
      value="-1"
      key={uuid()}
    >
      Pick a Month
    </option>
  ];
  for (let i = 0; i <= 11; i++)
    options.push(
      <option className={`${props.className}-option`} value={i} key={uuid()}>
        {format(new Date(2019, i), "MMMM")}
      </option>
    );

  return (
    <div className={props.className}>
      <select className={`${props.className}-month`} defaultValue="-1">
        {options}
      </select>
      <input className={`${props.className}-year`} defaultValue="2019" />
    </div>
  );
}
