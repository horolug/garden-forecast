import React from 'react';
import helpers from '../Helpers/Helpers';

class UsersSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  harvestMessage(item){
    if ( item.willMature ){
      return "Planuojamas derlius :"+helpers.harvestTime(item.plant, item.selectedDate);
    }

    return "Augalas nespes sudereti";
  }

  render() {
    console.log("savedList", this.props.savedList );
    return(
      <div>
        <ul className="list-group mt-4 text-left">
          {this.props.savedList.map((item) => 
            <li className="list-group-item" key={item.entryID}>
              <p className="mb-1">Augalas : {item.plant.name}</p>
              <p className="mb-1">Sodinama : {item.selectedDate}</p>
              <p className="mb-1">{this.harvestMessage(item)}</p>
              <button className="btn btn-light"
                onClick={ () => this.props.removeEntry(item.entryID) } >
                remove
              </button>  
            </li>
          )}
        </ul>

      </div>
    );
  }
}

export default UsersSelection;
