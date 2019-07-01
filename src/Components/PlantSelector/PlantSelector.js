import React from 'react';
import moment from 'moment'
import CallDarkSky from '../DarkSky/DarkSky';
import DropDown from '../DropDown/DropDown';
import PlantingCalendar from '../Calendar/Calendar';
import helpers from '../Helpers/Helpers';

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
    };
    this.selectedPlant = this.selectedPlant.bind(this);
    this.plantingLocation = this.plantingLocation.bind(this);
  }

  plantList (){
    // Fixme - this static data for early dev purposes
    // Data should come from API

    const plants = {
      root: [
        {
          name: "carrot",
          variety: "orange",
          seedtoPlant: 7-10,
          plantToFruit: 70-80,
          minTemp: 4,
          optimalRange: 7-30
        },
        {
          name: "radish",
          variety: "big",
          seedtoPlant: 3-8,
          plantToFruit: 21-30,
          minTemp: 7,
          optimalRange: 9-29
        },

      ],
      fruit: [
        {
          name: "tomato",
          variety: "cherry",
          seedtoPlant: 6-14,
          plantToFruit: 21-35,
          minTemp: 10,
          optimalRange: 16-30
        },
        {
          name: "pumpkin",
          variety: "round",
          seedtoPlant: 6-10,
          plantToFruit: 21-35,
          minTemp: 16,
          optimalRange: 21-32
        },
      ],
      seed: [
        {
          name: "spinatch",
          variety: "green",
          seedtoPlant: 10-18,
          plantToFruit: 37-45,
          minTemp: 7,
          optimalRange: 10-21
        },
        {
          name: "lettuce",
          variety: "sweet",
          seedtoPlant: 6-10,
          plantToFruit: 45-55,
          minTemp: 2,
          optimalRange: 4-27
        },
      ]
    }
    return plants;
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
    const plant = this.state.plantList[event.target.id].find(obj => obj.name == event.target.value);

    this.setState({
      selectedPlant: plant,
      plantName: event.target.value,
      plantType: event.target.id,
    });
  }

  render() {
    const monthList = this.state.monthRange.map((val, i, arr) => {
     return <PlantingCalendar
       key={val}
       storeMonthDates={this.storeMonthDates}
       monthInQuestion={val}
       dayList={helpers.monthDays(this.state.plantType, val, this.state.selectedPlant )}
      />;
    });
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

        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-info active">
            <input type="radio" name="options" id="option1" autocomplete="off" checked/>
            Į atvirą gruntą
          </label>
          <label className="btn btn-info">
            <input type="radio" name="options" id="option2" autocomplete="off"/>
            Sodinama Šiltnamyje
          </label>
          <label className="btn btn-info">
            <input type="radio" name="options" id="option3" autocomplete="off"/>
            Sodinama šildomoje patalpoje
          </label>
        </div>
        <div className="row" >
          <div className="col mt-4">
            <p>Seeding / propagation advice is shown here </p>

            {monthList}
          </div>
        </div>
      </div>
    );
  }

}

export default PlantSelector;
