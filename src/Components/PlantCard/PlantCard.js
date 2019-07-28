import React from 'react';

class plantCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        plant: this.props.plant,
        // plant: this.props.plantList.find(x => x.id === window.location.pathname.split("/").pop() )
    };
    
  }

  render() {
    // console.log(   window.location.pathname.split("/").pop() ) ;
    // console.log("plant", this.state.plant.name );
    return (
      <h1>This is plant card for {this.props.plant.name} </h1>
    );
  }

}

export default plantCard;
