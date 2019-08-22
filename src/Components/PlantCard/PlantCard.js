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
      adjustedTemp: "normal"
    };
  }

  handleDayClick = (calendarDay) => {    
    this.setState({
      selectedDay: calendarDay
    });
  }

  adjustTemperature = (data) => {
    console.log('adjust temp called');
    this.setState({
      adjustedTemp : data
    });
  }

  render() {

    return (
      <div>
        <div className="row">
          <div className="col">
            <p>Pasirinkite kur bus siejamos sėklos. Pagal nutylėjimą skaičiuoklė numato kad bus siejamą į atvirą gruntą</p>
          </div>
        </div>
       
        <RadioToggle
          onChange={this.adjustTemperature}
        />

        <DateRange 
          plannerDates={this.props.plannerDates}
        />
        <div className="row" >
          <div className="col mt-4">
            <div className="row">
              <div className="col">
                <PlantingCalendar
                  calendarStart={this.props.calendarStart}
                  calendarEnd={this.props.calendarEnd}
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
