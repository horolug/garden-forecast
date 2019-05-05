import React from 'react';
import moment from 'moment';

class plantingCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      days: this.createDayCells(),
      calendarTable: this.createTableRows()
    };
  }

  createBlankCells( ){
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
    const firstDayOfMonth = moment(startOfMonth).isoWeekday();
    let blankCells = [];
    if ( firstDayOfMonth > 1 ){
      for ( let i = 1; i < firstDayOfMonth; i++ ){
        blankCells.push(
          <td key={"blank"+i}>blank</td>
        );
      }
    }

    return blankCells;
  }

  createDayCells(){
    let listOfDays = this.createBlankCells();
    this.createBlankCells();
    for ( let i = 0; i < moment().daysInMonth(); i++ ){
      listOfDays.push( <td key={i+1}> {i+1} </td>);
    }
    return listOfDays;
  }

  createTableRows(){
    const dayList = this.createDayCells();
    let calendarTable = [];
    let tableRows = [];
    const otherCalendarTable = dayList.map((val, i, arr) => {
      console.log("i value from map", i);
      console.log("val, value from map", val.key);

      if ( tableRows.length < 7){
        tableRows.push(dayList[i]);
        if ( i === dayList.length -1 ){
          calendarTable.push(
            <tr key={i}>
            {tableRows}
            </tr>
          );
        }
      } else {
        calendarTable.push(
          <tr key={i}>
          {tableRows}
          </tr>
        );
        tableRows = [];
      }
    });

    return calendarTable;
  }

  render() {
    console.log("days in month", moment().daysInMonth() );
    return (
      <div>
        <p>Calendar was called</p>
        <table>
          <thead>
            <tr>

            </tr>
          </thead>
          <tbody>
            {this.state.calendarTable}
          </tbody>
        </table>
      </div>
    );
  }

}

export default plantingCalendar;
