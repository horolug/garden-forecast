import React from 'react';

class CallDarkSky extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "", moonPhases: [] };
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

  callAPI() {
    // fetch("http://localhost:9000/testAPI")
    //       .then(res => res.text())
    //       .then(res => this.responseFormat(res) );
  }
  componentWillMount() {
    this.callAPI();
  }

  render() {
    const phaseList = this.state.moonPhases.map((item, index) => (
      <li key={item} className="list-group-item"> {item} </li>
    ));


    return (
      <div className="row">
        <div className="col">
          <p>Current temperature is {this.state.currentTemp} </p>
          <ul className="list-group list-group-horizontal">
            {phaseList}
          </ul>
        </div>
      </div>
    );
  }

}

export default CallDarkSky;
