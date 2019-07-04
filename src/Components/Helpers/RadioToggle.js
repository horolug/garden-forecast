import React from 'react';

class RadioToggle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "option1"
		};

	  this.radioChange = this.radioChange.bind(this);
  }

  radioChange(event) {
		this.setState({
			selectedOption: event.target.id
		});

    this.props.onChange(event.target.value);
	}

  isChecked(htmlID) {
    if (htmlID === this.state.selectedOption){
      return true
    }
    return false
  }
  applyClassName(htmlID){
    let className = "btn btn-info"
    if (htmlID === this.state.selectedOption){
      className = "btn btn-info active";
    }
    return className;
  }

  render() {
    return (
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className={this.applyClassName("option1")}>
          <input
            type="radio"
            name="options"
            id="option1"
            autoComplete="off"
            value="normal"
					  onChange={this.radioChange}
					  checked={this.isChecked("option1")}
          />
          Į atvirą gruntą
        </label>
        <label className={this.applyClassName("option2")}>
          <input
            type="radio"
            name="options"
            id="option2"
            autoComplete="off"
            value="plus-ten"
            onChange={this.radioChange}
					  checked={this.isChecked("option2")}
          />
          Sodinama Šiltnamyje
        </label>
        <label className={this.applyClassName("option3")}>
          <input
            type="radio"
            name="options"
            id="option3"
            autoComplete="off"
            value="ideal"
            onChange={this.radioChange}
					  checked={this.isChecked("option3")}
          />
          Sodinama šildomoje patalpoje
        </label>
      </div>
    );
  }

}

export default RadioToggle;
