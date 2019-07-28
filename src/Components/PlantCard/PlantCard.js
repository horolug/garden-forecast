import React from 'react';
import RadioToggle from '../Helpers/RadioToggle';
import PlantingCalendar from '../Calendar/Calendar';

class plantCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plant: this.props.plant,
    };
    
  }

  render() {
    // console.log(   window.location.pathname.split("/").pop() ) ;
    // console.log("plant", this.state.plant.name );
    return (
      <div>
        <h1>This is plant card for {this.props.plant.name} </h1>

        <div className="row">
          <p>Pasirinkite kur bus siejamos sėklos</p>
          <p>Pagal nutylėjimą skaičiuoklė numato kad bus siejamą į atvirą gruntą</p>
        </div>

        <RadioToggle
          onChange={this.props.adjustTemperature}
        />

        <div className="row" >
          <div className="col mt-4">
            <p>Seeding / propagation advice is shown here </p>

            {/* <PlantingCalendar
              monthRange={this.state.monthCount}
              adjustedTemp={this.state.adjustedTemp}
              plant={this.state.selectedPlant}
             /> */}
          </div>
        </div>
      </div>
    );
  }

}

export default plantCard;
