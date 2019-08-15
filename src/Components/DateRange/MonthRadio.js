import React from 'react';
import moment from 'moment';

class MonthRadio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  radioDisabled( start, end ){
    // return false;
    // console.log('radio disabled', this.props.startDate);
    // console.log('start', start);
    // console.log('end', end);

    // if ( moment(end).isBefore(start) ){
    //   return true;
    // }

    // return false;
  }

  render() {
    const monthNames = moment.months();
    const radioName = this.props.rangeStart ? 'monthRangeStart' : 'monthRangeEnd';
       
    const monthList = monthNames.map( (item, index) => 
      <div className="form-check" key={index}> 
        <input className="form-check-input"
          onChange={ (e) => this.props.monthSelect(e, this.props.rangeStart) }
          type="radio"
          name={radioName} 
          value={this.props.startYear+"-"+ parseInt(index+1) +"-01"} 
          id={radioName+index}
          disabled={this.radioDisabled( this.props.startDate, this.props.endDate )} />
        <label className="form-check-label" htmlFor={radioName+index}>
          {item}
        </label>
      </div>        
    );
   
    return (
      <div>
        {monthList}       
      </div>
    );
  }

}

export default MonthRadio;
