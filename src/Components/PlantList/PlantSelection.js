import React from 'react';

class plantType extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button 
        type="button" 
        data-id={this.props.id}
        onClick={(e) => this.props.onClick(e)}
        className="btn btn-outline-primary ml-1 mr-1">
        {this.props.name}
      </button>
    );
  }

}

export default plantType;
