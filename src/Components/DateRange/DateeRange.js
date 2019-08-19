import React from 'react';
import moment from 'moment';
import MonthRadio from './MonthRadio';
import YearRadio from './YearRadio';

class DateRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().startOf('year').format("YYYY-MM-DD"),
      endDate: moment().startOf('year').format("YYYY-MM-DD"),
      cardOpen: false
    };
  }

  selectedRange(calendarStart, calendarEnd){
    console.log('make new calendar based on provided range');
    this.toggleCard();
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

  toggleCard(){
    
    const currentState = this.state.cardOpen;


    this.setState({
      cardOpen: !currentState
    })
  }

  render() {  
    return (
      <div>

        <div className="card mb-4">
          <div 
            onClick={() => this.toggleCard()}
            className="card-header"> 
            <button className="btn btn-link">
              {this.state.cardOpen? "Uzdaryti laiko pasirinkima":" Pasirinkti sodinimo laika" }
            </button>
          </div>
          <div className={this.state.cardOpen? "card-body":"d-none" } >
            <div className="row">
              <div className="col">
                <h4>Nuo</h4>
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
                <h4>Iki</h4>
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
          </div>
          <div className={this.state.cardOpen? "card-footer d-flex justify-content-between":"d-none"} >
            <button 
              className="btn btn-secondary"
              onClick={() => this.toggleCard() }
              >
                Uzdaryti
            </button>
            <button 
              className="btn btn-primary "
              onClick={() => this.selectedRange(this.state.startDate, this.state.endDate)}
              >
                Pasirinkti
            </button>
            </div>
        </div>        
    
      </div>
      
    );
  }

}

export default DateRange;
