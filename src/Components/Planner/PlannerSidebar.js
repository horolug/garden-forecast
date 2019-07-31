import React from 'react';

class PlannerSidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    let plannerButton = "";
    if ( this.props.selectedDay !== "" ){
      plannerButton = <button 
        onClick={ () => this.props.saveEntry(this.props.selectedDay) }
        className="btn btn-primary">
          Add date to planner
      </button>
    }

    let savedList = "";
    if (this.props.savedList.length > 0){
      savedList =  <ul className="list-group mt-4">
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
    }

    return (
      <div>
        <p>Planner sidebar</p>
        <p>Please choose a calendar day </p>

        {plannerButton}
        {savedList}
      </div>
    );
  }

}

export default PlannerSidebar;
