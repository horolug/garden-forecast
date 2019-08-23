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

  makeList(list, listTitle){

    if (list.length === 0){
      return "";
    }
    return <div> <p className="mt-4">{listTitle}</p> 
        <ul className="list-group mt-4 text-left">
        {list.map((item) => 
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
  }

  render() {
    console.log("savedList", this.props.savedList );
    const normal = this.props.savedList.filter( (item) => item.plantedIn === "normal" );
    const plusTen = this.props.savedList.filter( (item) => item.plantedIn === "plus-ten" );
    const ideal = this.props.savedList.filter( (item) => item.plantedIn === "ideal" );
    const normalTitle = "Sodinama atvirame grunte";
    const plusTenTitle = "Sodinama siltnamyje";
    const idealTitle = "Sodinama sildomoje patalpoje";
    return(
      <div>
        
        { this.makeList(normal, normalTitle) }

        { this.makeList(plusTen, plusTenTitle) }

        { this.makeList(ideal, idealTitle) }

      </div>
    );
  }
}

export default UsersSelection;
