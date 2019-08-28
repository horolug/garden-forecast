import React from 'react';
import Toast from 'react-bootstrap/Toast'
import RadioToggle from '../Helpers/RadioToggle';
import DateRange from '../DateRange/DateeRange';
import PlantingCalendar from '../Calendar/Calendar';
import PlannerSidebar from '../Planner/PlannerSidebar';

class plantCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plant: this.props.plant,
      showToast: false,
      level: 'success',
      selectedDay: "",
      adjustedTemp: "normal"
    };
  }

  handleDayClick = (calendarDay) => {   
    console.log("calendarDay", calendarDay); 
    this.setState({
      selectedDay: calendarDay,
      showToast: true
    });
  }

  adjustTemperature = (data) => {
    console.log('adjust temp called', data);
    this.props.adjustedTemp(data);
    this.setState({
      adjustedTemp : data
    });
  }

  toggleToast (){
    const showToast = this.state.showToast;
    this.setState({
      showToast: !showToast,
    })
  }

  saveEntry(){
    this.toggleToast();
    this.props.saveEntry(this.state.selectedDay);
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

        <Toast 
          show={this.state.showToast} 
          onClose={()=>this.toggleToast()}
          style={{
            position: 'fixed',
            top: 150,
            right: 10,
          }}
          >
          <Toast.Header>
            <strong className="mr-auto">Prideti prie pasirinkimu</strong>
          </Toast.Header>
          <Toast.Body>
            <p>Augalas: {this.props.plant.name}</p>
            <p>Sodinimo laikas: {this.state.selectedDay}</p>
            <button onClick={() => this.saveEntry() } className="btn btn-primary">Prideti</button>  
          </Toast.Body>
        </Toast> 

      </div>
    );
  }

}

export default plantCard;
