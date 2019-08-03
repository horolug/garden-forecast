import React from 'react';
import moment from 'moment';

class DateRange extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  monthSelect(){
    console.log("monthSelect called");
  }

  yearSelect( ){
    console.log("yearSelect called");
  }

  render() {  
    const currentYear = moment().startOf('year');
    const nexYear = moment(currentYear).add(1, 'year');

    const monthNames = moment.months();
    const monthList = monthNames.map( (item, index) => 
      <div className="form-check form-check-inline" key={index}> 
        <input className="form-check-input"
          onChange={ () =>this.monthSelect() }
          type="checkbox" value="" id={"monthIndex"+index} />
        <label className="form-check-label" htmlFor={"monthIndex"+index}>
          {item}
        </label>
      </div>        
    );
    
    return (
      <div>
        <p>Year - select year</p>
        <div className="">
          <div className="form-check form-check-inline" > 
            <input
              onChange={() =>this.yearSelect()}
              className="form-check-input" type="checkbox" value="" id={"year-"+nexYear.format("YYYY")} />
            <label className="form-check-label" htmlFor={"year-"+nexYear.format("YYYY")}>
              {currentYear.format("YYYY")}
            </label>
          </div>  
          <div className="form-check form-check-inline"> 
            <input
              onChange={() =>this.yearSelect()}
              className="form-check-input" type="checkbox" value="" id={"year-"+nexYear.format("YYYY")} />
            <label className="form-check-label" htmlFor={"year-"+nexYear.format("YYYY")}>
              {nexYear.format("YYYY")}
            </label>
          </div>  
  
          <p>Months - select montRange</p>
          <div>        
            {monthList}
          </div>
        </div>
        
        <div> 
          <button className="btn btn-primary"
            onClick={() => this.props.plannerDates("foo")}
          >Pasirinkti </button>
        </div>
      </div>
      
    );
  }

}

export default DateRange;
