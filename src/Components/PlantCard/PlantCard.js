import React from 'react';
import RadioToggle from '../Helpers/RadioToggle';
import DateRange from '../DateRange/DateeRange';
import PlantingCalendar from '../Calendar/Calendar';
import PlannerSidebar from '../Planner/PlannerSidebar';


class plantCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plant: this.props.plant,
      selectedDay: "",
    };
  }

  handleDayClick = (calendarDay) => {    
    this.setState({
      selectedDay: calendarDay
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <p>Pasirinkite kur bus siejamos sėklos</p>
          <p>Pagal nutylėjimą skaičiuoklė numato kad bus siejamą į atvirą gruntą</p>
        </div>
        <DateRange />
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
                  selectedDay={this.state.selectedDay}
                />
              </div>
              <div className="col">
                <PlannerSidebar 
                  saveEntry={this.props.saveEntry}
                  removeEntry={this.props.removeEntry}
                  selectedDay={this.state.selectedDay}
                  plant={this.props.plant}
                  savedList={this.props.savedList}
                  selectedDay={this.state.selectedDay}

                />
              </div>
            </div>
            

          </div>
        </div>
      </div>
    );
  }

}

export default plantCard;
