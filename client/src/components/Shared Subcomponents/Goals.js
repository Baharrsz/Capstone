import React from "react";

export default function Goals(props) {
  return (
    <section className={`${props.className}-events ${props.className}-section`}>
      <h3 className={`${props.className}-section-title`}></h3>
      <div
        className={`${props.className}-events-body ${props.className}-section-body`}
      >
        Goals Here
      </div>
    </section>
  );
}
