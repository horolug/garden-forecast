import React from 'react';

class MonthRadio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const radioName = this.props.rangeStart ? 'monthRangeStart' : 'monthRangeEnd';
    const monthList = this.props.monthNames.map( (item, index) => 
      <div className="form-check" key={index}> 
        <input className="form-check-input"
          onChange={ () => this.props.monthSelect( this.props.rangeStart, item ) }
          type="radio"
          name={radioName} 
          value={item} id={radioName+index} />
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
