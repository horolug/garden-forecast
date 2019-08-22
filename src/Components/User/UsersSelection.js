import React from 'react';
import helpers from '../Helpers/Helpers';

class UsersSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("savedList", this.props.savedList );
    return(
      <div>
        <h3>User selection</h3>

        <ul className="list-group">
          {this.props.savedList.map((item) => 
            <li className="list-group-item" key={item.entryID}>
              <p>Augalas : {item.plant.name}</p>
              <p>Sodinama : {item.selectedDate}</p>
              <p>Planuojamas derlius : {helpers.harvestTime(item.plant, item.selectedDate)} </p>
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
