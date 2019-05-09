import React from 'react';
import moment from 'moment';
import 'moment/locale/lt';

moment.locale('lt');

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
          <div className="calendarDay" key={"blank"+i}></div>
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
        listOfDays.push( <div className="calendarDay" key={i+1}> {i+1}</div>);
      }
    } else {
      console.log("this.props.dayList.length", this.props.dayList.length);
      for ( let i = 0; i < this.props.dayList.length; i++ ){
        const calendarDay = moment(this.props.dayList[i].date).format("D");
        const optimal = this.props.dayList[i].optimal ? "calendarDay optimal" : "calendarDay";
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
    console.log("dayList", dayList);
    let calendarTable = [];
    let tableRows = [];
    const otherCalendarTable = dayList.map((val, i, arr) => {
      // console.log("i value from map", i);
      // console.log("val, value from map", val.key);

      if ( tableRows.length < 7){
        tableRows.push(dayList[i]);
        console.log("pushing", dayList[i]);
        if ( i === dayList.length - 1 ){
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
        tableRows.push(dayList[i]);
      }
    });
    return calendarTable;
  }

  createCalendarHeader(){
    const currentMonth = <div className="row">
      <div className="col">
        {moment().format("MMMM")}
      </div>
    </div>;

    return currentMonth;
  }

  createWeekDays(){
    const weekdaysArray = moment.weekdaysShort();
    weekdaysArray.push(weekdaysArray.shift());
    let weekdays = [];
    weekdaysArray.map((val, i, arr) => {
      weekdays.push(
        <div className="calendarDay" key={val}>{val}</div>
      );
    });

    // console.log("weekdays are", moment.weekdays());
    return weekdays;
  }

  render() {
    console.log("received from parent", this.props.dayList);
    return (
      <div>
        <p>Calendar was called</p>
        <div className="container">
          {this.createCalendarHeader()}
          <div className="row"> {this.createWeekDays()} </div>
          {this.createTableRows()}
        </div>
      </div>
    );
  }

}

export default plantingCalendar;
