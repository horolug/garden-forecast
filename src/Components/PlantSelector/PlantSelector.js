import React from 'react';


class PlantSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <p>Plant selection is happening here</p>
        </div>

        <div className="col">
          <p>Seeding / propagation advice is shown here </p>
        </div>
      </div>
    );
  }

}

export default PlantSelector;
