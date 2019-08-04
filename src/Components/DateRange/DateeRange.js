import React from 'react';
import moment from 'moment';
import MonthRadio from './MonthRadio';
import YearRadio from './YearRadio';


class DateRange extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      monthRangeStart: "",
      monthRangeEnd: "",
      yearRangeStart: "",
      yearRangeEnd: ""
    };
  }

  selectedRange(){
    console.log('make new calendar based on provided range');
  }

  monthSelect = (rangeStart, monthName) => {
    if (rangeStart){
      this.setState({
        monthRangeStart: monthName
      })
  
    } else {
      this.setState({
        monthRangeEnd: monthName
      })
    }
  }

  yearSelect = (rangeStart, year) => {
    if (rangeStart){
      this.setState({
        yearRangeStart: year
      })
  
    } else {
      this.setState({
        yearRangeEnd: year
      })
    }
  }

  isDisabled(){
    if( 
      this.state.monthRangeStart.length > 0 && 
      this.state.monthRangeEnd.length > 0 && 
      this.state.yearRangeStart.length > 0 && 
      this.state.yearRangeEnd.length > 0 ){
        return false;
      }
    return true;
  }

  render() {  
    const currentYear = moment().startOf('year');
    const nexYear = moment(currentYear).add(1, 'year');    
  
    return (
      <div>
        <p>Year - select year</p>
        <div className="row">
          <div className="col">
            <h3>From</h3>
            <YearRadio 
              rangeStart={true}
              currentYear={currentYear.format("YYYY")}
              nexYear={nexYear.format("YYYY")}
              yearSelect={this.yearSelect}
            />
            <MonthRadio 
              monthNames={moment.months()}
              monthSelect={this.monthSelect}
              rangeStart={true}
            />
          </div>

          <div className="col">
            <h3>To</h3>
            <YearRadio 
              rangeStart={false}
              currentYear={currentYear.format("YYYY")}
              nexYear={nexYear.format("YYYY")}
              yearSelect={this.yearSelect}
            />
            <MonthRadio 
              monthNames={moment.months()}
              monthSelect={this.monthSelect}
              rangeStart={false}
            />
          </div>

        </div>
       
        <div className="text-center mt-2 mb-2"> 
          <button 
            disabled={this.isDisabled()}
            className="btn btn-primary"
            onClick={() => this.selectedRange()}
          >Pasirinkti </button>
        </div>
      </div>
      
    );
  }

}

export default DateRange;
