import React from "react";
import { format } from "date-fns";
import uuid from "uuid";
import Select from "react-select";

export default function Picker(props) {
  // let options = [
  //   <option className={`${props.className}-option`} value="null" key={uuid()}>
  //     Pick a Month
  //   </option>
  // ];
  let options = [{ value: "Pick a month", label: "Pick a month" }];
  for (let i = 0; i <= 11; i++)
    // options.push(
    //   <option className={`${props.className}-option`} value={i} key={uuid()}>
    //     {format(new Date(2019, i), "MMMM")}
    //   </option>
    options.push({
      value: i,
      label: format(new Date(2019, i), "MMMM")
    });

  return (
    <div className={props.className}>
      {/* <select
        className={`${props.className}-month`}
        defaultValue="null"
        onChange={props.pickMonth}
      >
        {options}
      </select> */}
      <Select
        className={props.className}
        classNamePrefix={props.className}
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
