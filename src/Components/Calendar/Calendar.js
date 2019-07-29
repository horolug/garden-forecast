import React from 'react';
import moment from 'moment';
import 'moment/locale/lt';
import helpers from '../Helpers/Helpers';

moment.locale('lt');

class PlantingCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dayList: []
    };
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

  createDayCells(month, counter){
    let listOfDays = this.createBlankCells( month.monthStart );
    const plantType = this.props.plant.type;
    
    // badge to be used only in harvest cycle calculations
    // const badge = <span className="badge badge-pill badge-primary">{cycleCounter}</span>;
    // isOptimalForPlanting should match month avg temp with plant temp requirements
    // const optimalDate = helpers.isOptimalForPlanting(
    //   dateInQuestion,
    //   this.props.plant.type,
    //   this.props.plant,
    //   this.props.adjustedTemp
    // );

    for (let j = 0; j < month.days.length; j++){
      let optimal = this.currentDay(month.days[j].date);

      if (month.days[j].idealFor === plantType){
        optimal = "optimal " + this.currentDay(month.days[j].date );
      }
      const calendarDay = moment(month.days[j].date).format("D");

      listOfDays.push(
        <div className={optimal} key={month.days[j].date}>
          {calendarDay}
        </div>
      );    
    }

    return listOfDays;

  }

  createTableRows(month, counter){
    const dayList = this.createDayCells(month, counter);
    let calendarTable = [];
    let tableRows = [];

    for( let i = 0; i < dayList.length; i++ ){
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
    if ( dateInQuestion === moment().format("YYYY-MM-DD") ){
      currentDay = "calendarDay currentDay";
    }

    return currentDay;
  }

  createMonth(){
    let calendarList = [];
    let counter = new helpers.cycleCounter();

    const calendarBlock = helpers.makeCalendar(this.props.calendarStart, this.props.calendarEnd);

    for (let i = 0; i < calendarBlock.length; i++){
      const monthInQuestion = calendarBlock[i].monthStart;
      calendarList.push(
        <div key={monthInQuestion} className="mb-4">
          <div className="container">
            {this.createCalendarHeader(monthInQuestion)}
            <div className="row"> {this.createWeekDays()} </div>
            {this.createTableRows(calendarBlock[i], counter)}
          </div>
        </div>
      );
    }
    return calendarList;
  }

  render() {
    return (
      <div>
        {this.createMonth()}
      </div>
    );
  }

}

export default PlantingCalendar;
