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
      currentMonth: moment("2019-07-01").format("YYYY-MM-DD"),
    };
    this.selectedPlant = this.selectedPlant.bind(this);

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

           <PlantingCalendar
             storeMonthDates={this.storeMonthDates}
             monthInQuestion={this.state.currentMonth}
             dayList={helpers.monthDays(this.state.plantType, this.state.currentMonth )}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default PlantSelector;
