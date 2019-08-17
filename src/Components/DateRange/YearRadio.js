import React from 'react';
import moment from 'moment';


class YearRadio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  radioDisabled( srartDate, endDate ){
    if ( moment(endDate).isBefore(srartDate) &&  !this.props.rangeStart ){
      return true;
    }
    return false;
  }

  resetRadio ( srartDate, endDate ){
    if (  this.radioDisabled( srartDate, endDate) ){
      return false;
    }
  }

  render() {

    const radioName = this.props.rangeStart ? 'yearRangeStart' : 'yearRangeEnd';
    
    const currentYear = moment().format("YYYY");
    const monthFromProps = moment(this.props.beginDate).format("M");
    const daysFromProps = moment(this.props.beginDate).format("DD");
    const dateString = currentYear+"-"+monthFromProps+"-"+daysFromProps;
    const thisYear = moment(dateString).format("YYYY-MM-DD");
    const thisYearLabel = moment (thisYear).format("YYYY");
    const nextYear = moment (thisYear).add(1, "year").format("YYYY-MM-DD");
    const nextYearLabel = moment (nextYear).format("YYYY");
    
    return (
      <div>
         <div className="form-check form-check-inline" > 
            <input
              onChange={(e) => this.props.yearSelect(e, this.props.rangeStart)}
              className="form-check-input" 
              name={radioName} 
              type="radio" 
              checked={this.resetRadio( this.props.beginDate, thisYear) }
              disabled={this.radioDisabled(this.props.beginDate, thisYear )}
              value={thisYear} 
              id={"yearA-"+radioName+"-"+thisYear} />
            <label className="form-check-label" htmlFor={"yearA-"+radioName+"-"+thisYear}>
              {thisYearLabel}
            </label>
          </div>  
          <div className="form-check form-check-inline"> 
            <input
              onChange={(e) => this.props.yearSelect(e, this.props.rangeStart)}
              className="form-check-input" 
              name={radioName} 
              type="radio" 
              disabled={this.radioDisabled(this.props.beginDate, nextYear )}
              value={nextYear} 
              id={"yearB"+radioName+"-"+nextYear} />
            <label className="form-check-label" htmlFor={"yearB"+radioName+"-"+nextYear}>
              {nextYearLabel}
            </label>
          </div>  
       
      </div>
    );
  }

}

export default YearRadio;
