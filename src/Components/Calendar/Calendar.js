import React from 'react';
import moment from 'moment';
import 'moment/locale/lt';

moment.locale('lt');

class plantingCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  createBlankCells( month ){
    const startOfMonth = moment(month).startOf("month").format("YYYY-MM-DD");
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

  createDayCells(month){
    let listOfDays = this.createBlankCells( month );
    if ( !this.props.dayList ){
      for ( let i = 0; i < moment(month).daysInMonth(); i++ ){
        const startOfMonth =  moment(month).startOf("month").format("YYYY-MM");
        const dateInQuestion = moment(startOfMonth+"-"+(i+1)).format("YYYY-MM-DD");
        listOfDays.push( <div className={this.currentDay(dateInQuestion)} key={i+1}> {i+1}</div>);
      }
    } else {
      for ( let i = 0; i < this.props.dayList.length; i++ ){
        const calendarDay = moment(this.props.dayList[i].date).format("YYYY-MM-DD");
        let optimal = "calendarDay";
        if (this.props.dayList[i].optimal){
          optimal = "calendarDay optimal";
        }
        optimal = optimal +" "+ this.currentDay(calendarDay);
        listOfDays.push(
          <div className={optimal} key={this.props.dayList[i].date}>
            {calendarDay}
          </div>
        );
      }
    }

    return listOfDays;
  }

  createTableRows(month){
    const dayList = this.createDayCells(month);
    let calendarTable = [];
    let tableRows = [];

    for( let i = 0; i <dayList.length; i++ ){
      if ( tableRows.length < 7){
        tableRows.push(dayList[i]);
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
    }
    return calendarTable;
  }

  createCalendarHeader(month){
    const currentMonth = <div className="row">
      <div className="col">
        {moment(month).format("MMMM")}
      </div>
    </div>;

    return currentMonth;
  }

  createWeekDays(){
    const weekdaysArray = moment.weekdaysShort();
    weekdaysArray.push(weekdaysArray.shift());
    const weekdays = weekdaysArray.map((val, i, arr) => {
      return <div className={this.currentDay(val)} key={val}>{val}</div>;
    });

    return weekdays;
  }

  currentDay( dateInQuestion ){
    let currentDay = "calendarDay";
    if ( dateInQuestion ===  moment().format("YYYY-MM-DD") ){
      currentDay = "calendarDay currentDay";
    }

    return currentDay;
  }

  render() {
    return (
      <div>
        <p>Calendar was called</p>
        <div className="container">
          {this.createCalendarHeader(this.props.monthInQuestion)}
          <div className="row"> {this.createWeekDays()} </div>
          {this.createTableRows(this.props.monthInQuestion)}
        </div>
      </div>
    );
  }

}

export default plantingCalendar;
