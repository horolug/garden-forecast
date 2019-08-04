import React from 'react';

class YearRadio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const radioName = this.props.rangeStart ? 'yearRangeStart' : 'yearRangeEnd';

    return (
      <div>
         <div className="form-check form-check-inline" > 
            <input
              onChange={() => this.props.yearSelect(this.props.rangeStart,  this.props.currentYear )}
              className="form-check-input" 
              name={radioName} 
              type="radio" 
              value={this.props.currentYear} 
              id={"year-"+this.props.currentYear} />
            <label className="form-check-label" htmlFor={"year-"+this.props.currentYear}>
              {this.props.currentYear}
            </label>
          </div>  
          <div className="form-check form-check-inline"> 
            <input
              onChange={() =>this.props.yearSelect(this.props.rangeStart,  this.props.currentYear )}
              className="form-check-input" 
              name={radioName} 
              type="radio" 
              value={this.props.nexYear} 
              id={"year-"+this.props.nexYear} />
            <label className="form-check-label" htmlFor={"year-"+this.props.nexYear}>
              {this.props.nexYear}
            </label>
          </div>  
       
      </div>
    );
  }

}

export default YearRadio;
