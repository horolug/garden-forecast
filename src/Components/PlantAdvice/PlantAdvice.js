import React from 'react';

class PlantAdvice extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const conditions =  this.props.iDealConditions;
    // const conditionList = "";
    console.log("conditions", conditions);
    let conditionList = "";
    if ( conditions !== false ){
      conditionList = conditions.map((item, index) => (
       <li className="list-group-item" key={index}>{item.date} / {item.phase} / {item.condition}</li>
     ));
    }
    return (
      <div>
        <ul className="list-group"> {conditionList} </ul>
        <ul className="list-group">
          <li className="list-group-item">Otimal direct Plant date range [Date range to be calculated] </li>
          <li className="list-group-item">Optimal Propagation date range [Date range to be calculated]</li>
        </ul>
      </div>

    );
  }

}

export default PlantAdvice;
