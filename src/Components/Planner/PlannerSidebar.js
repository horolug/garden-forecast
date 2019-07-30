import React from 'react';

class PlannerSidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>Planner sidebar</p>
        <button>Add date to planner</button>
        <p>Fixme - following to be part of the list</p>
        <p>Selected date</p>
        <p>Selected plant</p>
      </div>
    );
  }

}

export default PlannerSidebar;
