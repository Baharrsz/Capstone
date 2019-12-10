import React, { Component } from "react";
import uuid from "uuid";

export default class ShowAncestorGoals extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    const ancestors = this.props.ancestors;
    const ancestorsElements = Object.keys(ancestors).map(ancestor => {
      if (ancestors[ancestor]) {
        const ancestorGoals = Object.values(ancestors[ancestor].goals);
        return (
          <div className="planning__transferred" key={uuid()}>
            <button
              className="planning__transferred-title "
              onClick={click => this.showOrHide(click, ancestor)} //Here: Think about this!
            >{`${ancestor} goals`}</button>
            <div
              className={`planning__transferred-list ${
                this.state[`show_${ancestor}`] ? "show" : "hide"
              }`}
            >
              {ancestorGoals.map(ancestorGoal => {
                return (
                  <div className="planning__transferred-list-item" key={uuid()}>
                    <div className="planning__transferred-list-item--label">
                      <input
                        className="planning__transferred-list-item--check"
                        type="checkbox"
                        checked={ancestorGoal.checked === "true"}
                      ></input>
                      {ancestorGoal.goal}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    });
    return (
      <div className="planning__ancestors--goals planning__ancestors">
        {ancestorsElements}
      </div>
    );
  }

  showOrHide = (click, ancestor) => {
    click.preventDefault();
    this.setState({
      [`show_${ancestor}`]: !this.state[`show_${ancestor}`]
    });
  };
}
