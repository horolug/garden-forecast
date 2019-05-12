import React from 'react';
import moment from 'moment';

class CallDarkSky extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "", moonPhases: [] };
    this.getForecast = this.getForecast.bind(this);
  }

  responseFormat( response ){
    const formatted = JSON.parse(response);
    const daily = formatted.data.daily.data;
    console.log("response is", formatted.data);

    let moonPhase = [];

    for(let i=0; i < daily.length; i++){
      moonPhase.push({
        phase: daily[i].moonPhase,
        date: moment.unix(daily[i].time ).format("YYYY-MM-DD")
      });
    }

    this.setState({
      apiResponse: response,
      currentTemp: formatted.data.currently.temperature
    });
    // this.props.storeMoonPhases(moonPhase);
  }

  getForecast(e){
    e.preventDefault();
    fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.responseFormat(res) );
  }

  render() {
    let weatherData = "";
    if (this.state.currentTemp){
      weatherData = <div className="col mt-4">
        <p>Current temperature is {this.state.currentTemp} </p>
      </div>
    }

    return (
      <div className="row">
        <div className="col">
          <button
            disabled={(this.props.plantType === "" ) ? true : false }
            onClick={(e)=>this.getForecast(e)}
            className="btn btn-primary btn-lg">Get forecast</button>
        </div>
        {weatherData}
      </div>
    );
  }

}

export default CallDarkSky;
