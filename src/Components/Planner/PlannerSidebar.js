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
        <button 
          onClick={ () => this.props.saveEntry(this.props.selectedDay) }
          className="btn btn-primary">
             Add date to planner
        </button>
        <p>Fixme - following to be part of the list</p>

        <ul className="list-group">
          {this.props.savedList.map((item, index) => (
            <li key={index} item={item}  className="list-group-item"> 
              <p>Selected date {item.selectedDate}</p>
              <p>Selected plant {item.plant.name}</p> 
              <button className="btn btn-light"
                onClick={ () => this.props.removeEntry(item.entryID) } >
                remove
              </button>  
            </li>
          ))}
        </ul>
      </div>
    );
  }

}

export default PlannerSidebar;
