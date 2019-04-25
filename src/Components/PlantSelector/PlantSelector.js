import React from 'react';
import CallDarkSky from '../DarkSky/DarkSky';
import DropDown from '../DropDown/DropDown';
import PlantAdvice from '../PlantAdvice/PlantAdvice';

class PlantSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plantOptions: [ 'carrots', 'tomatoes', 'cucumbers', 'pumpkins', 'bellpeppers' ],
      rootPlants: ['carrots', 'radishes'],
      fruitPlants: ['tomatoes', 'pumpkins', 'bellpeppers', 'cucumbers'],
      seedPlants: ['spinach', 'lettuce']
    };
  }

  render() {
    return (
      <div>
        <CallDarkSky />
        <div className="row">
          <div className="col">
            <p>Plant selection is happening here</p>
            <p>Root</p>
            <DropDown
              plantType="root"
              options={this.state.rootPlants}
            />
            <p>Fruit</p>
            <DropDown
              plantType="fruit"
              options={this.state.fruitPlants}
            />
            <p>Seed</p>
            <DropDown
              plantType="seed"
              options={this.state.seedPlants}
            />
          </div>
          <div className="col">
            <p>Seeding / propagation advice is shown here </p>

            <PlantAdvice />
          </div>
        </div>
      </div>
    );
  }

}

export default PlantSelector;
