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
        className="btn btn-primary mb-4">
          Prideti data
      </button>
    }

    let savedList = "";
    if (this.props.savedList.length > 0){
      savedList =  <ul className="list-group mt-4">
                      {this.props.savedList.map((item, index) => (
                        <li key={item.entryID}  className="list-group-item"> 
                          <p className="mb-1">Augalas {item.plant.name}</p> 
                          <p className="mb-1">Data {item.selectedDate}</p>
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
        <p>Paspauskite ant kalendoriaus dienos noredami pasirinkit sodinimo data </p>

        {plannerButton}

        <p>Pasirinkti augalai</p>
        {savedList}
      </div>
    );
  }

}

export default PlannerSidebar;
