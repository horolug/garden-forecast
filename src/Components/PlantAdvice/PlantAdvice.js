import React from 'react';
import PlantingCalendar from '../Calendar/Calendar';


class PlantAdvice extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const conditions = this.props.iDealConditions;
    let conditionList = "";
    if ( conditions !== false ){
      conditionList = conditions.map((item, index) => (
       <li className="list-group-item" key={index}>{item.date} / {item.phase} / {item.condition}</li>
     ));
    }
    return (
      <div>
        <ul className="list-group"> {conditionList} </ul>
        <PlantingCalendar
          optimalDates={conditions}
         />
      </div>

    );
  }

}

export default PlantAdvice;
