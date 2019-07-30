import React from 'react';
import RadioToggle from '../Helpers/RadioToggle';
import PlantingCalendar from '../Calendar/Calendar';
import PlannerSidebar from '../Planner/PlannerSidebar';


class plantCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plant: this.props.plant,
    };
  }

  handleDayClick = (calendarDay) => {
    const entryData = {
      date: calendarDay,
      plant: this.props.plant
    }
    console.log("handleDayClick works");
    this.setState({
      entryData: entryData
    });
  }

  render() {
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
            <div className="row">
              <div className="col">
                <PlantingCalendar
                  calendarStart="2019-02-01"
                  calendarEnd="2019-08-22"
                  saveEntry={this.props.saveEntry}
                  handleDayClick={this.handleDayClick}
                  adjustedTemp={this.state.adjustedTemp}
                  plant={this.props.plant}
                />
              </div>
              <div className="col">
                <PlannerSidebar/>
              </div>
            </div>
            

          </div>
        </div>
      </div>
    );
  }

}

export default plantCard;
