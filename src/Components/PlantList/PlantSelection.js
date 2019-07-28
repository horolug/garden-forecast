import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class plantType extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  makeLink(id){
    return "/sodinimas/"+id
  }

  render() {

    let buttonStyle = 'btn btn-outline-primary ml-1 mr-1';
    if ( window.location.pathname.split("/").pop() === this.props.id ){
      buttonStyle = 'btn btn-outline-primary ml-1 mr-1 active';
    }
    console.log("plantType called");
    return (
      <Link 
        to={this.makeLink(this.props.id)}
        role="button" 
        className={buttonStyle}>
        {this.props.name}
      </Link>
    );
  }

}

export default plantType;
