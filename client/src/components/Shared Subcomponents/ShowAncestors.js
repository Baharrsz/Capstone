import React, { Component } from "react";
import uuid from "uuid";

export default class ShowAncestors extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    const ancestors = this.props.ancestors;
    const section = this.props.section;
    const ancestorsElements = Object.keys(ancestors).map(ancestor => {
      if (ancestors[ancestor]) {
        const ancestorItems = Object.values(ancestors[ancestor][section]);
        return (
          <div className="planning__transferred" key={uuid()}>
            <button
              className="planning__transferred-title"
              onClick={click => this.showOrHide(click, ancestor)} //Here: Think about this!
            >{`${ancestor} ${section}`}</button>
            <div
              className={`planning__transferred-list ${
                this.state[`show_${ancestor}`] ? "show" : "hide"
              }`}
            >
              {ancestorItems.map(ancestorItem => {
                return Object.keys(ancestorItem).map(key => {
                  return (
                    <div
                      className={`planning__transferred-list-item planning__transferred-list-item--${key}`}
                      key={uuid()}
                    >
                      <label className="planning__transferred-list-item-label">
                        {key}
                      </label>

                      <div className="planning__transferred-list-item-value">
                        {ancestorItem[key]}
                      </div>
                    </div>
                  );
                });
              })}
            </div>
          </div>
        );
      }
    });
    return (
      <div className={`planning__ancestors--${section} planning__ancestors`}>
        {ancestorsElements}
      </div>
    );
  }

  showOrHide = (click, ancestor) => {
    click.preventDefault();
    this.setState({ [`show_${ancestor}`]: !this.state[`show_${ancestor}`] });
  };
}
