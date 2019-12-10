import React, { Component } from "react";
import { format } from "date-fns";
import axios from "axios";
import uuid from "uuid";

import PlanningTitle from "./PlanningTitle";
import PlanningSection from "./PlanningSection";
import ShowAncestors from "./ShowAncestors";
import ShowAncestorGoals from "./ShowAncestorGoals";
import ShowDescendants from "./ShowDescendants";
import ShowDescendantGoals from "./ShowDescendantGoals";
import MainEvents from "./MainEvents";
import MainGoals from "./MainGoals";
import MainSchedule from "./MainSchedule";

var delayed;
export default class PlanningPage extends Component {
  constructor(props) {
    super(props);
    this.url = `http://localhost:5000${this.props.match.url.slice(0, -5)}`;
    this.MainEvents = React.createRef();
    this.MainSchedule = React.createRef();
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
        <div className="planning__heading heading">
          <div className="heading-date placard">
            <button
              className="heading__jumpBtn jumpBtn placard__jumpBtn placard__jumpBtn--prev"
              value={-1}
              onClick={this.jumpToMonth} //Not implemented
            ></button>
            <PlanningTitle
              className="planning__title heading__title placard__date"
              params={this.props.match.params}
            />
            <button
              className="heading__jumpBtn jumpBtn placard__jumpBtn"
              value={1}
              onClick={this.jumpToMonth} //Not implemented
            ></button>
          </div>

          <button
            className="heading__mainBtn saveBtn"
            type="button"
            onClick={this.sendToDatabase}
          ></button>
        </div>

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
              ref={this.MainEvents}
              params={this.props.match.params}
              mainEvents={this.state.main.events}
              deleteEvent={this.deleteEvent}
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
              deleteGoal={this.deleteGoal}
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

        {/* Schedule section */}
        <PlanningSection
          sectionTitle="Schedule"
          className="planning__schedule"
          ancestorsController={
            <ShowAncestors
              ancestors={this.state.ancestors}
              section="schedule"
            />
          }
          mainController={
            <MainSchedule
              ref={this.MainSchedule}
              params={this.props.match.params}
              mainSchedule={this.state.main.schedule}
              deleteScheduleItem={this.deleteScheduleItem}
              addNewScheduleItem={this.addNewScheduleItem}
            />
          }
          descendantsController={
            <ShowDescendants
              descendants={this.state.descendants}
              section="schedule"
            />
          }
        />
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
  deleteEvent = clickDelete => {
    const eventsToKeep = {};
    const events = this.state.main.events;
    for (let key in events) {
      if (key !== clickDelete.target.form.id) eventsToKeep[key] = events[key];
    }
    this.setState({
      main: { ...this.state.main, events: eventsToKeep }
    });
  };

  //This will be called in MainEvents to add new events
  addNewEvent = clickAdd => {
    clickAdd.preventDefault();
    const eventId = `${this.MainEvents.current.state.starts}-${uuid()}`;
    let newEvent = {};
    newEvent[eventId] = {
      event: clickAdd.target.event.value,
      starts: format(this.MainEvents.current.state.starts, "HH:mm"),
      ends: format(this.MainEvents.current.state.ends, "HH:mm"),
      location: clickAdd.target.location.value
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

  //This will be called in MainEvents to delete events previosly added to the database
  deleteGoal = clickDelete => {
    const goalsToKeep = {};
    const goals = this.state.main.goals;
    for (let key in goals) {
      if (goals[key].id !== clickDelete.target.form.id)
        goalsToKeep[key] = goals[key];
    }
    this.setState({
      main: { ...this.state.main, goals: goalsToKeep }
    });
  };

  //This will be called in MainGoals to add new goals
  addNewGoal = clickAdd => {
    clickAdd.preventDefault();
    const goalId = uuid();
    const goalOrder = `none-false-${goalId}`;
    let newGoal = {};
    newGoal[goalOrder] = {
      id: goalId,
      goal: clickAdd.target.goal.value,
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
  changeFocus = clickFocus => {
    const goals = this.state.main.goals;

    for (let key in goals) {
      if (goals[key].id === clickFocus.target.form.id)
        goals[key].focus = clickFocus.target.value;
    }
    this.setState({
      main: { ...this.state.main, goals: goals }
    });
  };

  //This will be called in MainSchedule to add new schedule items
  addNewScheduleItem = clickAdd => {
    clickAdd.preventDefault();

    const itemId = clickAdd.target.order.value;
    let newItem = {};
    newItem[itemId] = {
      item: clickAdd.target.item.value,
      starts: this.MainSchedule.current.state.start,
      ends: this.MainSchedule.current.state.end,
      duration: this.MainSchedule.current.state.duration
    };
    this.setState({
      main: {
        ...this.state.main,
        schedule: { ...this.state.main.schedule, ...newItem }
      }
    });
  };

  //This will be called in MainEvents to delete events previosly added to the database
  deleteScheduleItem = clickDelete => {
    const itemsToKeep = {};
    const items = this.state.main.schedule;
    for (let key in items) {
      if (key !== clickDelete.target.form.id) itemsToKeep[key] = items[key];
    }
    this.setState({
      main: { ...this.state.main, schedule: itemsToKeep }
    });
  };
}
