import React from 'react';

class Germination extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rangeList: this.drawRange(),
    };
  }

  drawRange(){

    // container will represent 100%
    // range will be placed with help of margin - left;
    // range will go from 0 to 38 celcius
    const chartMax = 38;
    const chartMin = 0;

    let rangeList = [];

    for ( let i = 0; i < this.props.plants.length; i++ ){
      const left = this.props.plants[i].optimalRange[0] / chartMax*100;
      const width = ( (this.props.plants[i].optimalRange[1] / chartMax) -
                      (this.props.plants[i].optimalRange[0] / chartMax)
                     ) * 100;

      rangeList.push({
          plantName: this.props.plants[i].name,
          left: left,
          width: width
      });
    }
    return rangeList;

  }

  tempRange(){
    let tempRange = [];
    for(let f = 0; f < 38; f++){
      if ( f % 5 === 0  || f === 0 || f === 38 ){
        tempRange.push(
           <div className="col" key={f}>{f}</div>
        )
      }
    };
    return tempRange;
  }

  render() {


    const list = this.state.rangeList.map( plant => {
      const style = {
        "background": "blue",
        "marginLeft": plant.left+"%",
        "width": plant.width+"%",
        "height": "16px"
      }
      return <div key={plant.plantName} className="row">
          <div className="col-1">{plant.plantName}</div>
          <div className="col">
            <div style={style}> </div>
          </div>
        </div>;
    });

    return(
      <div>
        <h3>Germination Chart</h3>
        <div className="row">
          <div className="col-1">
            Name
          </div>

          <div className="col">
            <div className="row ">
              <div className="col text-center" >
                temperature C
              </div>
            </div>
            <div className="row">
              {this.tempRange()}
            </div>
          </div>
        </div>
        {list}
      </div>
    );
  }
}

export default Germination;
