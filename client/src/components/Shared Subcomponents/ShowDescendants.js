import React, { Component } from "react";
import uuid from "uuid";

export default class ShowDescendants extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    //Creating html for showing descendant events/schedules
    const descendants = this.props.descendants;
    const section = this.props.section;
    const descendantsElements = Object.keys(descendants).map(
      descendantArrayName => {
        if (descendants[descendantArrayName]) {
          const descendantArray = descendants[descendantArrayName];
          return (
            <div className="planning__transferred" key={uuid()}>
              <button
                className="planning__transferred-title"
                onClick={click => this.showOrHide(click, descendantArrayName)}
              >{`${descendantArrayName} ${section}`}</button>
              <div
                className={`planning__transferred__collection ${
                  this.state[`show_${descendantArrayName}`] ? "show" : "hide"
                }`}
              >
                {descendantArray.map(descendant => {
                  const descendantItems = Object.values(descendant[section]);
                  return (
                    <div
                      className="planning__transferred__collection-item"
                      key={uuid()}
                    >
                      <button
                        className="planning__transferred__collection-title"
                        onClick={click => this.showOrHide(click, descendant.id)}
                      >
                        {descendant.id}
                      </button>
                      <div
                        className={`planning__transferred-list ${
                          this.state[`show_${descendant.id}`] ? "show" : "hide"
                        }`}
                      >
                        {descendantItems.map(descendantItem => {
                          return (
                            <div
                              className="planning__transferred-list-item"
                              key={uuid()}
                            >
                              {Object.keys(descendantItem).map(key => {
                                return (
                                  <div
                                    className={`planning__transferred-list-item-key planning__transferred-list-item--${key}`}
                                    key={uuid()}
                                  >
                                    <label className="planning__transferred-list-item-label">
                                      {key}
                                    </label>

                                    <div className="planning__transferred-list-item-value">
                                      {descendantItem[key]}
                                    </div>
                                  </div>
                                );
                              })}
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
      <div
        className={`planning__descendants--${section} planning__descendants`}
      >
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
