import React from 'react';
import moment from 'moment';

class plantingCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      days: this.createDayCells(),
    };
  }

  createBlankCells( ){
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
    const firstDayOfMonth = moment(startOfMonth).isoWeekday();
    let blankCells = [];
    if ( firstDayOfMonth > 1 ){
      for ( let i = 1; i < firstDayOfMonth; i++ ){
        blankCells.push(
          <div className="col-1" key={"blank"+i}></div>
        );
      }
    }

    return blankCells;
  }

  createDayCells(){
    let listOfDays = this.createBlankCells();
    this.createBlankCells();
    if ( !this.props.dayList ){
      for ( let i = 0; i < moment().daysInMonth(); i++ ){
        listOfDays.push( <div className="col-1" key={i+1}> {i+1}</div>);
      }
    } else {
      console.log("this.props.dayList.length", this.props.dayList.length);
      for ( let i = 0; i < this.props.dayList.length; i++ ){
        const calendarDay = moment(this.props.dayList[i].date).format("D");
        const optimal = this.props.dayList[i].optimal ? "col-1 optimal" : "col-1";
        listOfDays.push(
          <div className={optimal} key={this.props.dayList[i].date}>
            {calendarDay}
          </div>
        );
      }
    }

    return listOfDays;
  }

  createTableRows(){
    const dayList = this.createDayCells();
    let calendarTable = [];
    let tableRows = [];
    const otherCalendarTable = dayList.map((val, i, arr) => {
      // console.log("i value from map", i);
      // console.log("val, value from map", val.key);

      if ( tableRows.length < 7){
        tableRows.push(dayList[i]);
        if ( i === dayList.length -1 ){
          calendarTable.push(
            <div className="row" key={i}>
            {tableRows}
            </div>
          );
        }
      } else {
        calendarTable.push(
          <div className="row" key={i}>
          {tableRows}
          </div>
        );
        tableRows = [];
      }
    });
    return calendarTable;
  }

  render() {
    console.log("received from parent", this.props.dayList);
    return (
      <div>
        <p>Calendar was called</p>
        <div className="container">
          {this.createTableRows()}
        </div>
      </div>
    );
  }

}

export default plantingCalendar;
