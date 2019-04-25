import React from 'react';

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
      moonPhase.push( daily[i].moonPhase );
    }
    //
    console.log("moonpahse list", moonPhase);

    this.setState({
      apiResponse: response,
      currentTemp: formatted.data.currently.temperature,
      moonPhases: moonPhase
    });
  }

  getForecast(e){
    e.preventDefault();
    fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.responseFormat(res) );
  }

  callAPI() {
    // fetch("http://localhost:9000/testAPI")
    //       .then(res => res.text())
    //       .then(res => this.responseFormat(res) );
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    let weatherData = "";
    if (this.state.currentTemp){
      const phaseList = this.state.moonPhases.map((item, index) => (
        <li key={item} className="list-group-item"> {item} </li>
      ));

      weatherData = <div className="col mt-4 mb-4">
        <p>Current temperature is {this.state.currentTemp} </p>
        <ul className="list-group list-group-horizontal">
          {phaseList}
        </ul>
      </div>
    }

    return (
      <div className="row">
        <div className="col">
          <button
            onClick={(e)=>this.getForecast(e)}
            className="btn btn-primary btn-lg">Get forecast</button>
        </div>
        {weatherData}
      </div>
    );
  }

}

export default CallDarkSky;
