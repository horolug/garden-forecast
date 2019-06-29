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
      monthRange: this.timeRange(),
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
          name: "tomatoe",
          variety: "cherry",
          seedtoPlant: 6-14,
          plantToFruit: 21-35,
          minTemp: 10,
          optimalRange: 16-30
        },
        {
          name: "'pumpkin",
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

  }

  averageTemp (){
    // Fixme - this static data for a small specific region
    const tempList = [
      {
        avgMax : "-2",
        avgMin : "-5"
      },
      {
        avgMax : "-2",
        avgMin : "-5"
      },
      {
        avgMax : "+5",
        avgMin : "-2"
      },
      {
        avgMax : "14",
        avgMin : "0"
      },
      {
        avgMax : "15",
        avgMin : "8"
      },
      {
        avgMax : "16.4",
        avgMin : "10"
      },
      {
        avgMax : "17.5",
        avgMin : "11"
      },
      {
        avgMax : "15",
        avgMin : "10"
      },
      {
        avgMax : "13",
        avgMin : "8"
      },
      {
        avgMax : "10",
        avgMin : "2"
      },
      {
        avgMax : "5",
        avgMin : "0"
      },
      {
        avgMax : "0",
        avgMin : "-5"
      },
    ]
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
    this.setState({
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
       dayList={helpers.monthDays(this.state.plantType, val )}
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
          <div className="col">
            <p>Root</p>
            <DropDown
              plantType="root"
              selectedPlant={(e) => this.selectedPlant(e)}
              options={this.state.rootPlants}
            />
          </div>
          <div className="col">
            <p>Fruit</p>
            <DropDown
              plantType="fruit"
              selectedPlant={(e) => this.selectedPlant(e)}
              options={this.state.fruitPlants}
            />
          </div>
          <div className="col">
            <p>Seed</p>
            <DropDown
              plantType="seed"
              selectedPlant={(e) => this.selectedPlant(e)}
              options={this.state.seedPlants}
            />
          </div>

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
