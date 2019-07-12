import React from 'react';
import moment from 'moment'
import CallDarkSky from '../DarkSky/DarkSky';
import DropDown from '../DropDown/DropDown';
import PlantingCalendar from '../Calendar/Calendar';
import helpers from '../Helpers/Helpers';
import RadioToggle from '../Helpers/RadioToggle';
import Germination from '../Charts/GerminationChart';

class PlantSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plantOptions: [ 'carrots', 'tomatoes', 'cucumbers', 'pumpkins', 'bellpeppers' ],
      rootPlants: ['carrots', 'radishes'],
      fruitPlants: ['tomatoes', 'pumpkins', 'bellpeppers', 'cucumbers'],
      seedPlants: ['spinach', 'lettuce'],
      plantName: '',
      plantType: '',
      selectedPlant: {},
      plantList: this.plantList(),
      monthRange: this.timeRange(),
      dayRange: 365,
      adjustedTemp: "normal",
      monthCount: 6,
      plantArray: [
        {
          name: "carrot",
          type: "root",
          variety: "orange",
          seedtoPlant: 7-10,
          plantToFruit: 75,
          minTemp: 4,
          optimalRange: [7, 30]
        },
        {
          name: "radish",
          type: "root",
          variety: "big",
          seedtoPlant: 3-8,
          plantToFruit: 25,
          minTemp: 7,
          optimalRange: [9, 29]
        },
        {
          name: "tomato",
          type: "fruit",
          variety: "cherry",
          seedtoPlant: 6-14,
          plantToFruit: 27,
          minTemp: 10,
          optimalRange: [16, 30]
        },
        {
          name: "pumpkin",
          type: "fruit",
          variety: "round",
          seedtoPlant: 6-10,
          plantToFruit: 27,
          minTemp: 16,
          optimalRange: [21, 32]
        },
        {
          name: "spinatch",
          type: "seed",
          variety: "green",
          seedtoPlant: 10-18,
          plantToFruit: 41,
          minTemp: 7,
          optimalRange: [10, 21]
        },
        {
          name: "lettuce",
          type: "seed",
          variety: "sweet",
          seedtoPlant: 6-10,
          plantToFruit: 50,
          minTemp: 2,
          optimalRange: [4, 27]
        },
      ]
    };
    this.selectedPlant = this.selectedPlant.bind(this);
  }

  plantList (){
    // Fixme - this static data for early dev purposes
    // Data should come from API

    const plants = {
      root: [
        {
          name: "carrot",
          type: "root",
          variety: "orange",
          seedtoPlant: 7-10,
          plantToFruit: 75,
          minTemp: 4,
          optimalRange: [7, 30]
        },
        {
          name: "radish",
          type: "root",
          variety: "big",
          seedtoPlant: 3-8,
          plantToFruit: 25,
          minTemp: 7,
          optimalRange: [9, 29]
        },

      ],
      fruit: [
        {
          name: "tomato",
          type: "fruit",
          variety: "cherry",
          seedtoPlant: 6-14,
          plantToFruit: 27,
          minTemp: 10,
          optimalRange: [16, 30]
        },
        {
          name: "pumpkin",
          type: "fruit",
          variety: "round",
          seedtoPlant: 6-10,
          plantToFruit: 27,
          minTemp: 16,
          optimalRange: [21, 32]
        },
      ],
      seed: [
        {
          name: "spinatch",
          type: "seed",
          variety: "green",
          seedtoPlant: 10-18,
          plantToFruit: 41,
          minTemp: 7,
          optimalRange: [10, 21]
        },
        {
          name: "lettuce",
          type: "seed",
          variety: "sweet",
          seedtoPlant: 6-10,
          plantToFruit: 50,
          minTemp: 2,
          optimalRange: [4, 27]
        },
      ]
    }
    return plants;
  }

  adjustTemperature = (data) => {
    this.setState({
      adjustedTemp : data
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

    return monthList;
  }

  storeMoonPhases = (data) => {
    this.setState({
      moonPhases: data
    });
  }

  selectedPlant (event) {
    // FIXME selected plant and plant type are most likely redundant
    const plant = this.state.plantList[event.target.id].find(obj => obj.name === event.target.value);

    this.setState({
      selectedPlant: plant,
      plantName: event.target.value,
      plantType: event.target.id,
    });
  }

  render() {
    const daylist = [];

    return (
      <div>
        <CallDarkSky
          plantType={this.state.plantType}
          storeMoonPhases={this.storeMoonPhases}
        />
        <div className="row">
          <div className="col mt-4 mb-4">
            <h3>Plant selection</h3>
          </div>
        </div>
        <div className="row">
          <p>Pasirinkite kas bus siejama</p>
        </div>
        <div className="row">
          <div className="col">
            <p>Root</p>
            <DropDown
              plantType="root"
              selectedPlant={(e) => this.selectedPlant(e)}
              options={this.state.plantList.root}
            />
          </div>
          <div className="col">
            <p>Fruit</p>
            <DropDown
              plantType="fruit"
              selectedPlant={(e) => this.selectedPlant(e)}
              options={this.state.plantList.fruit}
            />
          </div>
          <div className="col">
            <p>Seed</p>
            <DropDown
              plantType="seed"
              selectedPlant={(e) => this.selectedPlant(e)}
              options={this.state.plantList.seed}
            />
          </div>
        </div>
        <div className="row">
          <p>Pasirinkite kur bus siejamos sėklos</p>
          <p>Pagal nutylėjimą skaičiuoklė numato kad bus siejamą į atvirą gruntą</p>
        </div>

        <RadioToggle
          onChange={this.adjustTemperature}
         />
        <div className="row" >
          <div className="col mt-4">
            <p>Seeding / propagation advice is shown here </p>

            <PlantingCalendar
              monthRange={this.state.monthCount}
              adjustedTemp={this.state.adjustedTemp}
              plant={this.state.selectedPlant}
             />
          </div>
        </div>

        <Germination
          plants = {this.state.plantArray}/>

      </div>
    );
  }

}

export default PlantSelector;
