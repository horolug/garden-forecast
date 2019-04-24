import React from 'react';
import CallDarkSky from '../DarkSky/DarkSky';
import DropDown from '../DropDown/DropDown';
import PlantAdvice from '../PlantAdvice/PlantAdvice';

class PlantSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plantOptions: [ 'carrots', 'tomatoes', 'cucumbers', 'pumpkins', 'bellpeppers' ]
    };
  }

  render() {
    return (
      <div>
        <CallDarkSky />
        <div className="row">
          <div className="col">
            <p>Plant selection is happening here</p>

            <DropDown
              options={this.state.plantOptions}
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
