import React from 'react';

class CallDarkSky extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  responseFormat( response ){
    const formatted = JSON.parse(response);
    console.log("response is", formatted.data);
    this.setState({
      apiResponse: response,
      currentTemp: formatted.data.currently.temperature
    });
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.responseFormat(res) );
  }
  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <p>Current temperature is {this.state.currentTemp} </p>
        </div>
      </div>
    );
  }

}

export default CallDarkSky;
