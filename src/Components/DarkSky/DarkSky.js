import React from 'react';

class CallDarkSky extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  callAPI() {
      fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }
  componentWillMount() {
      this.callAPI();
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <p>DarkSky API call component is loaded</p>
          <p>Getting test response {this.state.apiResponse}</p>
        </div>
      </div>
    );
  }

}

export default CallDarkSky;
