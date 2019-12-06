import React, { Component } from "react";
import uuid from "uuid";

export default class EditEvents extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { ancestors, descendants, main } = this.props.savedPlans;

    //Creating html for showing ancestor events
    const ancestorsEvents = Object.keys(ancestors).map(ancestor => {
      if (ancestors[ancestor]) {
        const events = Object.values(ancestors[ancestor].events);
        return (
          <div className="planning__section-transferred">
            <h4 className="planning__section-transferred__title">{`${ancestor} Events`}</h4>
            <div className="planning__section-transferred__items">
              {events.map(event => {
                return Object.keys(event).map(key => {
                  return (
                    <div
                      className="planning__section-transferred-events"
                      key={uuid()}
                    >
                      <label className="planning__section-transferred-events-title">
                        {key}
                      </label>
                      <div className="wplanning__section-transferred-events-value">
                        {event[key]}
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

    //Creating html for showing descendant events
    const descendantsEvents = Object.keys(descendants).map(
      descendantArrayName => {
        if (descendants[descendantArrayName]) {
          ////
          const descendantArray = descendants[descendantArrayName];
          return (
            <div className="planning__section-transferred">
              <h4 className="planning__section-transferred__collection-title">{`${descendantArrayName} Events`}</h4>
              <div className="planning__section-transferred__collection">
                {descendantArray.map(descendant => {
                  const events = Object.values(descendant.events);
                  return (
                    <div>
                      <h5 className="planning__section-transferred__collection-title">
                        {descendant.id}
                      </h5>
                      <div className="planning__section-transferred__collection-items">
                        {events.map(event => {
                          return Object.keys(event).map(key => {
                            return (
                              <div
                                className="planning__section-transferred-events"
                                key={uuid()}
                              >
                                <label className="planning__section-transferred-events-title">
                                  {key}
                                </label>
                                <div className="wplanning__section-transferred-events-value">
                                  {event[key]}
                                </div>
                              </div>
                            );
                          });
                        })}
                      </div>
                      ;
                    </div>
                  );
                })}
              </div>
            </div>
          );

          ////
        }
      }
    );

    return (
      <div className="planning__events">
        <h3 className="planning__section-title">Events</h3>
        <div className="planning-events-ancestors planning-section-ancestors">
          {ancestorsEvents}
        </div>
        <div className="planning-events-descendants planning-section-descendants">
          {descendantsEvents}
        </div>
      </div>
    );
  }
}
