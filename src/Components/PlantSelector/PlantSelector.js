import React from 'react';
import CallDarkSky from '../DarkSky/DarkSky';
import DropDown from '../DropDown/DropDown';
import PlantAdvice from '../PlantAdvice/PlantAdvice';
import helpers from '../Helpers/Helpers';

class PlantSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plantOptions: [ 'carrots', 'tomatoes', 'cucumbers', 'pumpkins', 'bellpeppers' ],
      rootPlants: ['carrots', 'radishes'],
      fruitPlants: ['tomatoes', 'pumpkins', 'bellpeppers', 'cucumbers'],
      seedPlants: ['spinach', 'lettuce'],
      moonPhases: [],
      plantName: '',
      plantType: ''
    };
    this.selectedPlant = this.selectedPlant.bind(this);

  }

  storeMoonPhases = (data) => {
    this.setState({
      moonPhases: data
    });
  }

  selectedPlant (event) {
    console.log("event", event.target.value);
    console.log("event", event.target.id);

    this.setState({
      plantName:  event.target.value,
      plantType: event.target.id
    });
  }

  render() {
    let moonPhaseToday = "";
    if (this.state.moonPhases.length > 0){
      moonPhaseToday = this.state.moonPhases[0].phase;
    }
    helpers.moonPhaseCalendar();
    return (
      <div>
        <CallDarkSky
          plantType={this.state.plantType}
          storeMoonPhases={this.storeMoonPhases}
          moonPhases={this.state.moonPhases}
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

            <PlantAdvice
              iDealConditions={helpers.nextIdealConditions(moonPhaseToday, this.state.plantType)}
             />
          </div>
        </div>
      </div>
    );
  }

}

export default PlantSelector;
