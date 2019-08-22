import React from 'react';

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
              {item.selectedDate} / {item.plant.name}
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
