import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import moment from 'moment'
import helpers from '../Helpers/Helpers';
import Germination from '../Charts/GerminationChart';
import PlantCard from '../PlantCard/PlantCard';
import UsersSelection from '../User/UsersSelection';

class PlantSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPlant: {},
      monthRange: this.timeRange(),
      adjustedTemp: "normal",
      monthCount: 6,
      savedList: this.listFromLocalStorage(),
      plantArray: [
        {
          name: "carrot",
          id: "carrot",
          type: "root",
          variety: "orange",
          seedtoPlant: [7, 10],
          plantToFruit: 75,
          minTemp: 4,
          optimalRange: [7, 30]
        },
        {
          name: "radish",
          id: "raddish",
          type: "root",
          variety: "big",
          seedtoPlant: [3, 8],
          plantToFruit: 25,
          minTemp: 7,
          optimalRange: [9, 29]
        },
        {
          name: "tomato",
          id: "tomato",
          type: "fruit",
          variety: "cherry",
          seedtoPlant: [6, 14],
          plantToFruit: 27,
          minTemp: 10,
          optimalRange: [16, 30]
        },
        {
          name: "pumpkin",
          id: "pumpkin",
          type: "fruit",
          variety: "round",
          seedtoPlant: [6, 10],
          plantToFruit: 27,
          minTemp: 16,
          optimalRange: [21, 32]
        },
        {
          name: "spinatch",
          id: "spinatch",
          type: "seed",
          variety: "green",
          seedtoPlant: [10, 18],
          plantToFruit: 41,
          minTemp: 7,
          optimalRange: [10, 21]
        },
        {
          name: "lettuce",
          id: "lettuce",
          type: "seed",
          variety: "sweet",
          seedtoPlant: [6, 10],
          plantToFruit: 50,
          minTemp: 2,
          optimalRange: [4, 27]
        },
      ]
    };
    this.selectedPlant = this.selectedPlant.bind(this);
  }
  listFromLocalStorage (){
    const retrievedList = JSON.parse( localStorage.getItem('savedList') );
    if ( retrievedList === null){
      return [];
    }
    return retrievedList;
  }
  saveEntry = (selectedDate) => {
    const selectedPlant = this.selectedPlant();
    const entryID = selectedDate+"-"+selectedPlant.id;
    const savedList = this.state.savedList;

    if (savedList.some(e => e.entryID === entryID)) {
      return false;     
    } else {
      const newEntry = {
        selectedDate: selectedDate,
        plant: selectedPlant,
        entryID: entryID
      } 
      const updatedlList = this.state.savedList.slice(0);
      updatedlList.unshift(newEntry);

      localStorage.setItem('savedList', JSON.stringify(updatedlList) );

      this.setState({
        savedList: updatedlList
      })
    } 
  }

  removeEntry = (entryID) => {
    let savedList = this.state.savedList.slice(0);
    const entryIndex = savedList.findIndex(x => x.entryID === entryID);
    savedList.splice(entryIndex, 1);

    localStorage.setItem('savedList', JSON.stringify(savedList) );
    this.setState({
      savedList: savedList
    });
  }

  timeRange (){
    const currentMonth = moment().startOf('month');
    const months = 6;
    let monthList = [];
    for ( let i = 0; i < months; i++ ){
     monthList.push(
       moment(currentMonth).add(i, 'M').startOf('month').format("YYYY-MM-DD")
     )
    }
    console.log('timeRange is returning', monthList);
    return monthList;
  }

  selectedPlant (){
    const plant = this.state.plantArray.find(x => x.id === window.location.pathname.split("/").pop());   
    return plant;
  }

  makePlantLink(id){
    return "/sodinimas/"+id
  }

  plannerDates = ( calendarStart, calendarEnd ) => {
    this.setState({
      calendarStart: calendarStart,
      calendarEnd: calendarEnd
    })
    // return calendarRange;
  }
     
  render() {
    return (
      <div>
        <div className="row">
          <div className="col mt-4 mb-4">
            <h3>Plant selection</h3>
          </div>
        </div>
        <div className="row">
          <p>Pasirinkite kas bus siejama</p>
        </div>
        
        <Router>
          <div>
            
            <div className="d-flex justify-content-center mb-4">
              {this.state.plantArray.map((item, index) => ( 
                <NavLink 
                  key={item.id}
                  to={this.makePlantLink(item.id)}
                  role="button" 
                  className='btn btn-outline-primary ml-1 mr-1'
                  >
                  {item.name}
                </NavLink> 
              ))} 
            </div>

            <div>
              <NavLink 
                to="/pasirinkimai/"
                role="button"
                className='btn btn-primary mb-2'
              >
                Mano pasirinkimai
              </NavLink>
            </div>

            <Route 
              path="/" exact
              render={(props) => <Germination {...props} plants = {this.state.plantArray} />}/>
            <Route 
              path="/sodinimas/" 
              render={(props) => <PlantCard {...props} 
                                    savedList={this.state.savedList} 
                                    removeEntry={this.removeEntry} 
                                    saveEntry={this.saveEntry} 
                                    handleDayClick={this.handleDayClick}
                                    plannerDates={this.plannerDates}
                                    calendarStart={this.state.calendarStart}
                                    calendarEnd={this.state.calendarEnd}
                                    plant={this.selectedPlant()} />} />
            <Route 
              path="/pasirinkimai/" 
              render={(props) => <UsersSelection {...props}  
                                    removeEntry={this.removeEntry}
                                    savedList={this.state.savedList} />} />


          </div>
        </Router>

      </div>
    );
  }

}

export default PlantSelector;
