import React from 'react';
import moment from 'moment';

class DateRange extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {  
    const currentYear = moment().startOf('year');
    const nexYear = moment(currentYear).add(1, 'year');

    const monthNames = moment.months();
    const monthList = monthNames.map( (item, index) => 
      <div key={index} className="btn btn-outline-primary m-1">{item} </div> 
    );
    console.log('monthNames', monthNames);
    console.log('monthlist', monthList);
    return (
      <div>
        <p>Year - select year</p>
        <div >
          <button className="btn btn-outline-primary m-1"> {currentYear.format("YYYY")}</button>
          <button className="btn btn-outline-primary m-1"> {nexYear.format("YYYY")}</button>
        </div>
        <p>Months - select montRange</p>
        <div>        
          {monthList}
        </div>
      </div>
      
    );
  }

}

export default DateRange;
