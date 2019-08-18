import React from 'react';
import moment from 'moment';
import MonthRadio from './MonthRadio';
import YearRadio from './YearRadio';

class DateRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().startOf('year').format("YYYY-MM-DD"),
      endDate: moment().startOf('year').format("YYYY-MM-DD")
    };
  }

  selectedRange(calendarStart, calendarEnd){
    console.log('make new calendar based on provided range');
    this.props.plannerDates(calendarStart, calendarEnd);
  }

  makeStartDate(){
    return moment().startOf('year').format("YYYY-MM-DD");
  }

  dateSelect = (event, rangeStart) => {
    let endDate = this.state.endDate;
  
    if (rangeStart){
      if ( moment( this.state.endDate ).isBefore( event.target.value ) ){
        endDate = event.target.value ;
      }

      this.setState({
        startDate: event.target.value,
        endDate: endDate
      })
  
    } else {
      endDate = event.target.value;
      if ( moment( event.target.value ).isBefore( this.state.startDate ) ){
        endDate = this.state.startDate;
      }

      this.setState({
        endDate: endDate
      })
    }
  } 

  isDisabled(){
    return false;
  }

  render() {  
    return (
      <div>
        <p>Year - select year</p>
        <div className="row">
          <div className="col">
            <h3>From</h3>
            <YearRadio 
              rangeStart={true}
              beginDate={this.state.startDate}
              endDate={this.state.endDate}
              yearSelect={this.dateSelect}
              checkedRadio={this.state.startDate}
            />
            <MonthRadio 
              monthSelect={this.dateSelect}
              rangeStart={true}
              beginDate={this.state.startDate}
              endDate={this.state.endDate}
              checkedRadio={this.state.startDate}
            />
          </div>

          <div className="col">
            <h3>To</h3>
            <YearRadio 
              rangeStart={false}
              beginDate={this.state.startDate}
              endDate={this.state.endDate}
              yearSelect={this.dateSelect}
              checkedRadio={this.state.endDate}
            />
            <MonthRadio 
              monthSelect={this.dateSelect}
              rangeStart={false}
              beginDate={this.state.startDate}
              endDate={this.state.endDate}
              checkedRadio={this.state.endDate}
            />
          </div>

        </div>
       
        <div className="text-center mt-2 mb-2"> 
          <button 
            disabled={this.isDisabled()}
            className="btn btn-primary"
            onClick={() => this.selectedRange(this.state.startDate, this.state.endDate)}
          >Pasirinkti </button>
        </div>
      </div>
      
    );
  }

}

export default DateRange;
