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
    let listOfDays = this.createBlankCells( month );

    for ( let i = 0; i < moment(month).daysInMonth(); i++ ){

      // Fixme - move into helpers.cycleMarker
      const startOfMonth =  moment(month).startOf("month").format("YYYY-MM-DD");
      const dateInQuestion = moment(startOfMonth).add(i, 'days').format("YYYY-MM-DD");
      const calendarDay = moment(startOfMonth).add(i, 'days').format("D");
      let badge = "";
      let optimal = this.currentDay(dateInQuestion);

      const optimalDate = helpers.isOptimalForPlanting(
                                  dateInQuestion,
                                  this.props.plant.type,
                                  this.props.plant,
                                  this.props.adjustedTemp
                                );

      const dayBefore = moment(dateInQuestion).subtract(1, 'days').format("YYYY-MM-DD");
      const optimalDayBefore = helpers.isOptimalForPlanting(
                                  dayBefore,
                                  this.props.plant.type,
                                  this.props.plant,
                                  this.props.adjustedTemp
                                );

      let cycleCounter = counter.stay();
      if (optimalDate === true && optimalDayBefore === false ){
        cycleCounter = counter.up();
      }
      if (optimalDate){
        optimal = "optimal " + this.currentDay(dateInQuestion);;
        badge = <span className="badge badge-pill badge-primary">{cycleCounter}</span>;

        helpers.harvestDays(dateInQuestion, this.props.plant, dateInQuestion);
      }

      listOfDays.push(
        <div className={optimal} key={calendarDay}>
          {calendarDay}
          {badge}
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
    for ( let i = 0; i < this.props.monthRange; i++){
      let monthInQuestion = moment().startOf('month');
      monthInQuestion.add(i, "months").format("YYYY-MM-DD");

      calendarList.push(
        <div key={monthInQuestion} className="mb-4">
          <div className="container">
            {this.createCalendarHeader(monthInQuestion)}
            <div className="row"> {this.createWeekDays()} </div>
            {this.createTableRows(monthInQuestion, counter)}
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
