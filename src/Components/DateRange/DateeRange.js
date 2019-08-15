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

  selectedRange(){
    console.log('make new calendar based on provided range');
  }

  makeStartDate(){
    return moment().startOf('year').format("YYYY-MM-DD");
  }

  monthSelect = (event, rangeStart) => {

    // console.log("formatted", moment(event.target.value).format("YYYY-MM-DD") );
    const selectedDate = moment(event.target.value).format("YYYY-MM-DD");

    if (rangeStart){
      this.setState({
        startDate: selectedDate
      })
  
    } else {
      this.setState({
        endDate: selectedDate
      })
    }
  }

  yearSelect = (event, rangeStart) => {
    if (rangeStart){
      console.log("start range is firing", event.target.value);
      this.setState({
        startDate: event.target.value
      })
    } else {
      console.log("end range is firing", event.target.value);
      this.setState({
        endDate: event.target.value
      })
    }
  }

  isDisabled(){
    return false;
  }

  render() {  
    // console.log("startDate", this.state.startDate );
    // console.log("endDate", this.state.endDate );

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
              yearSelect={this.yearSelect}
            />
            <MonthRadio 
              startYear={moment().format("YYYY")}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              monthSelect={this.monthSelect}
              rangeStart={true}
              beginDate={this.state.startDate}
            />
          </div>

          <div className="col">
            <h3>To</h3>
            <YearRadio 
              rangeStart={false}
              beginDate={this.state.startDate}
              endDate={this.state.endDate}
              yearSelect={this.yearSelect}
            />
            <MonthRadio 
              startYear={moment().format("YYYY")}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              monthSelect={this.monthSelect}
              rangeStart={false}
              beginDate={this.state.startDate}
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
