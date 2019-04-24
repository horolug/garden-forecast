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
      <select  className="custom-select">
        {oprionList}
      </select>
    );
  }

}

export default DropDown;
