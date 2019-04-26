import React from 'react';

class DropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const oprionList = this.props.options.map((item, index) => (
      <option key={index}> {item} </option>
    ));
    return (
      <select
        id={this.props.plantType}
        onChange={(e) => this.props.selectedPlant(e)}
        className="custom-select mb-4">
        {oprionList}
      </select>
    );
  }

}

export default DropDown;
