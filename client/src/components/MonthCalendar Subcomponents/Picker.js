import React from "react";
import { format } from "date-fns";
import Select from "react-select";

export default function Picker(props) {
  let options = [{ value: "Pick a month", label: "Pick a month" }];
  for (let i = 0; i <= 11; i++)
    options.push({
      value: i,
      label: format(new Date(2019, i), "MMMM")
    });

  return (
    <div className={props.className}>
      <Select
        className={`${props.className}-month`}
        classNamePrefix={`${props.className}-month`}
        maxMenuHeight={120}
        options={options}
        onChange={props.pickMonth}
      />
      <input
        className={`${props.className}-year`}
        defaultValue="2019"
        onKeyUp={props.pickYear}
      />
    </div>
  );
}
