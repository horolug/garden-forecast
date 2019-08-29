import React from 'react';

class PlantToFuit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rangeList: this.drawRange(),
    };
  }

  drawRange(){
    const chartMax = this.props.plants.reduce(function(prev, current) {
      return (prev > current.plantToFruit[1]) ? prev : current.plantToFruit[1]
    },0);
    const chartMin = 0;

    let rangeList = [];

    for ( let i = 0; i < this.props.plants.length; i++ ){
      const left = this.props.plants[i].plantToFruit[0] / (chartMax)*100;
      const width = ( (this.props.plants[i].plantToFruit[1] / (chartMax)) -
                      (this.props.plants[i].plantToFruit[0] / (chartMax) )
                     ) * 100;

      rangeList.push({
          plantName: this.props.plants[i].name,
          left: left,
          width: width
      });
    }
    return rangeList;

  }

  timeRange(){
    const maxTime = this.props.plants.reduce(function(prev, current) {
      return (prev > current.plantToFruit[1]) ? prev : current.plantToFruit[1]
    }, 0);
    let timeRange = [];
    for(let f = 0; f < (maxTime+10); f++){
      if ( f % 10 === 0  || f === 0 || f === (maxTime+10) ){
        timeRange.push(
           <div className="col" key={f}>{f}</div>
        )
      }
    };
    return timeRange;
  }

  render() {
    const list = this.state.rangeList.map( plant => {
      const style = {
        "background": "orange",
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
      <div className="mt-4">
        <h3>Plant to fruit Chart</h3>
        <div className="row">
          <div className="col-1">
            Name
          </div>

          <div className="col">
            <div className="row ">
              <div className="col text-center" >
                Time to Fruit
              </div>
            </div>
            <div className="row">
              {this.timeRange()}
            </div>
          </div>
        </div>
        {list}
      </div>
    );
  }
}

export default PlantToFuit;
