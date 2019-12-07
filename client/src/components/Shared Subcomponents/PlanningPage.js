import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid";

import PlanningTitle from "./PlanningTitle";
import EditEvents from "./EditEvents";
import EditGoals from "./EditGoals";
import PlanningSection from "./PlanningSection";
import ShowAncestors from "./ShowAncestors";
import ShowAncestorGoals from "./ShowAncestorGoals";
import ShowDescendants from "./ShowDescendants";
import ShowDescendantGoals from "./ShowDescendantGoals";
import MainEvents from "./MainEvents";
import MainGoals from "./MainGoals";

var delayed;
export default class PlanningPage extends Component {
  constructor(props) {
    super(props);
    this.url = `http://localhost:5000${this.props.match.url.slice(0, -5)}`;
  }
  state = {
    main: undefined,
    ancestors: undefined,
    descendants: undefined
  };

  render() {
    return !this.state.main ? (
      <>Loading...</>
    ) : (
      <div className="planning">
        <PlanningTitle
          className="planning__title"
          params={this.props.match.params}
        />
        <button
          className="planning__btn"
          type="button"
          onClick={this.sendToDatabase}
        >
          Save
        </button>

        {/* Edit Section */}
        {/* <EditEvents
          savedPlans={this.state}
          deleteEvents={this.deleteEvents}
          addNewEvent={this.addNewEvent}
        /> */}
        <PlanningSection
          sectionTitle="Events"
          className="planning__events"
          ancestorsController={
            <ShowAncestors ancestors={this.state.ancestors} section="events" />
          }
          mainController={
            <MainEvents
              mainEvents={this.state.main.events}
              deleteEvents={this.deleteEvents}
              addNewEvent={this.addNewEvent}
            />
          }
          descendantsController={
            <ShowDescendants
              descendants={this.state.descendants}
              section="events"
            />
          }
        />
        {/* Goals section */}
        {/* <EditGoals savedPlans={this.state} /> */}
        <PlanningSection
          sectionTitle="Goals"
          className="planning__goals"
          ancestorsController={
            <ShowAncestorGoals
              ancestors={this.state.ancestors}
              section="goals"
            />
          }
          mainController={
            <MainGoals
              mainGoals={this.state.main.goals}
              deleteGaols={this.deleteGoals}
              addNewGoal={this.addNewGoal}
              changeFocus={this.changeFocus}
            />
          }
          descendantsController={
            <ShowDescendantGoals
              descendants={this.state.descendants}
              section="goals"
            />
          }
        />
        {this.props.schedule}
      </div>
    );
  }

  componentDidMount() {
    //Cutting "/plan" from the end of the url
    axios.get(this.url).then(response => {
      if (response.data) {
      }
      const {
        Days,
        Week,
        Weeks,
        Month,
        Months,
        Year,
        events,
        goals,
        schedule
      } = response.data || {};
      const main = { events, goals, schedule };
      const ancestors = { Year, Month, Week };
      const descendants = { Months, Weeks, Days };
      this.setState({ main, ancestors, descendants });
    });
  }

  //This will send the information that is displayed on the page to the server after clicking the "Save" button
  sendToDatabase = saveEvent => {
    axios.post(this.url, this.state.main);
  };

  //This will be called in MainEvents to delete events previosly added to the database
  deleteEvents = deleteEvent => {
    const eventsToKeep = {};
    const events = this.state.main.events;
    for (let key in events) {
      if (key !== deleteEvent.target.form.id) eventsToKeep[key] = events[key];
    }
    this.setState({
      main: { ...this.state.main, events: eventsToKeep }
    });
  };

  //This will be called in MainEvents to add new events
  addNewEvent = submit => {
    submit.preventDefault();
    const eventId = `${submit.target.starts.value}-${uuid()}`;
    let newEvent = {};
    newEvent[eventId] = {
      event: submit.target.event.value,
      starts: submit.target.starts.value,
      ends: submit.target.ends.value,
      location: submit.target.location.value
    };
    this.setState({
      main: {
        ...this.state.main,
        events: { ...this.state.main.events, ...newEvent }
      }
    });
  };

  //I will write the functionality for editing main events after the demo day.
  //Possible solutions: * Waiting for a while after user has typed (--> possible bug) *using forwardref *checking if a button can belong to multiple forms *onInput?

  //This gets the inforamtion that is displaying in the main events section after the user changes something.
  // getEditedEvent = change => {
  //   let editedEvent;
  //   editedEvent[change.target.id] = {
  //     event: change.target.event.value,
  //     starts: change.target.starts.value,
  //     ends: change.target.ends.value,
  //     location: change.target.location.value
  //   };
  //   let events = this.state.main.events;
  //   events.

  //   //Waiting for some time so that the user finishes editing the event
  //   clearTimeout(delayed);
  //   delayed = setTimeout(() => {
  //     this.setState({ yearToShow: yearToShow });
  //   }, 5000);
  // };

  //This will be called in MainGoals to add new goals
  addNewGoal = submit => {
    submit.preventDefault();
    const goalId = uuid();
    const goalOrder = `none-false-${goalId}`;
    let newGoal = {};
    newGoal[goalOrder] = {
      id: goalId,
      goal: submit.target.goal.value,
      checked: "false",
      focus: "notFocus"
    };

    this.setState({
      main: {
        ...this.state.main,
        goals: { ...this.state.main.goals, ...newGoal }
      }
    });
  };

  //This will be called in MainGoals to change whether a goal should be focused on
  changeFocus = click => {
    const goals = this.state.main.goals;

    for (let key in goals) {
      if (goals[key].id === click.target.form.id)
        goals[key].focus = click.target.value;
    }
    this.setState({
      main: { ...this.state.main, goals: goals }
    });
  };
}
