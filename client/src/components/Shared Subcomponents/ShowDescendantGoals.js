import React, { Component } from "react";
import uuid from "uuid";

export default class ShowDescendantGoals extends Component {
  constructor(props) {
    super(props);
  }
  state = {};

  render() {
    //Creating html for showing descendant events
    const descendants = this.props.descendants;
    const descendantsElements = Object.keys(descendants).map(
      descendantArrayName => {
        if (descendants[descendantArrayName]) {
          const descendantArray = descendants[descendantArrayName];
          return (
            <div className="planning__transferred" key={uuid()}>
              <button
                className="planning__transferred-title"
                onClick={click => this.showOrHide(click, descendantArrayName)}
              >{`${descendantArrayName} goals`}</button>
              <div
                className={`planning__transferred__collection ${
                  this.state[`show_${descendantArrayName}`] ? "show" : "hide"
                }`}
              >
                {descendantArray.map(descendant => {
                  const descendantGoals = Object.values(descendant.goals);
                  return (
                    <div
                      className="planning__transferred__collection-item"
                      key={uuid()}
                    >
                      <button
                        className="planning__transferred-title"
                        onClick={click => this.showOrHide(click, descendant.id)}
                      >
                        {descendant.id}
                      </button>
                      <div
                        className={`planning__transferred-list ${
                          this.state[`show_${descendant.id}`] ? "show" : "hide"
                        }`}
                      >
                        {descendantGoals.map(descendantGoal => {
                          return (
                            <div
                              className="planning__transferred-list-item-value"
                              key={uuid()}
                            >
                              {descendantGoal.goal}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      }
    );

    return (
      <div className="planning__descendants--goals planning__descendants">
        {descendantsElements}
      </div>
    );
  }

  showOrHide = (click, descendant) => {
    click.preventDefault();
    this.setState({
      [`show_${descendant}`]: !this.state[`show_${descendant}`]
    });
  };
}
