import React from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countMale: 0,
      countFemale: 0,
      totalFinal: 0
    };
  }

  componentDidMount() {
    const elemCollapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elemCollapsible, {});
  }

  increment = () => {
    if (this.state.totalFinal >= 0 && this.state.countFemale >= 0)
      this.setState({
        countFemale: this.state.countFemale + 1,
        totalFinal: this.state.totalFinal + 1
      });
  };

  decrement = () => {
    if (this.state.totalFinal !== 0 && this.state.countFemale !== 0)
      this.setState({
        countFemale: this.state.countFemale - 1,
        totalFinal: this.state.totalFinal - 1
      });
  };

  incrementMale = () => {
    if (this.state.totalFinal >= 0 && this.state.countMale >= 0)
      this.setState({
        countMale: this.state.countMale + 1,
        totalFinal: this.state.totalFinal + 1
      });
  };

  decrementMale = () => {
    if (this.state.totalFinal !== 0 && this.state.countMale !== 0) {
      this.setState({
        countMale: this.state.countMale - 1,
        totalFinal: this.state.totalFinal - 1
      });
    }
  };

  render() {
    return (
      <div>
        <label>How many people</label>
        <ul class="collapsible">
          <li>
            <div class="collapsible-header">Guests {this.state.totalFinal}</div>
            <div class="collapsible-body">
              <div>
                <label>Female</label>
                <div>
                  <div className="inc" onClick={this.increment}>
                    +
                  </div>
                  {this.state.countFemale}
                  <div className="dec" onClick={this.decrement}>
                    -
                  </div>
                </div>
              </div>
              <div>
                <label>Male</label>
                <div>
                  <div className="inc" onClick={this.incrementMale}>
                    +
                  </div>
                  {this.state.countMale}
                  <div className="dec" onClick={this.decrementMale}>
                    -
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default reduxForm({
  form: "wizard", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(Counter);
