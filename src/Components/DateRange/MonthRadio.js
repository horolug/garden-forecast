import React from 'react';
import moment from 'moment';

class MonthRadio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      radioSelected: this.props.beginDate
    };
  }

  radioDisabled( index ){
    const endYear = moment(this.props.endDate).format("YYYY");
    const endDate = moment([endYear, index]).format("YYYY-MM-DD");
    if ( moment(endDate).isBefore( this.props.beginDate ) &&  !this.props.rangeStart ){
      return true;
    }
    return false;
  }

  checkedRadio ( index ){
    const startYear = moment(this.props.beginDate).format("YYYY");
    const endYear = moment(this.props.endDate).format("YYYY");
    if ( !this.props.rangeStart){      
      if( moment([endYear, index]).format("YYYY-MM-DD") ===  this.props.checkedRadio ){
        return true;
      } 
    } else {
      if( moment([startYear, index]).format("YYYY-MM-DD") ===  this.props.checkedRadio ){
        return true;
      } 
    }
    
    return false;
  }

  makeMonthDate( index, startYear, endYear ){
    if ( this.props.rangeStart){
      return moment([startYear, index]).format("YYYY-MM-DD");
    } 

    return moment([endYear, index]).format("YYYY-MM-DD");
  }

  render() {
    const monthNames = moment.months();
    const radioName = this.props.rangeStart ? 'monthRangeStart' : 'monthRangeEnd';
    
    const startYear = moment(this.props.beginDate).format("YYYY");
    const endYear = moment(this.props.endDate).format("YYYY");

    const monthList = monthNames.map( (item, index) => 
      <div className="form-check" key={index}> 
        <input className="form-check-input"
          onChange={ (e) => this.props.monthSelect(e, this.props.rangeStart) }
          type="radio"
          name={radioName} 
          value={ this.makeMonthDate(index, startYear, endYear) } 
          id={radioName+index}
          checked={this.checkedRadio( index ) }
          disabled={this.radioDisabled( index  )} />
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
