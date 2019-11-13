import React, { Component } from "react";
import WizardFormFirstPage from "./WizardFormFirstPage";
import WizardFormSecondPage from "./WizardFormSecondPage";
import WizardFormThirdPage from "./WizardFormThirdPage";
import ProgressBar from "./ProgressBar";
import "../css/formReservation.css";
import "../css/ProgressBar.css";
import { connect } from "react-redux";
import * as actions from "../actions";

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      color: "blue"
    };
  }

  renderProgressBar = () => {
    switch (this.state.page) {
      case 1:
        return <ProgressBar progress={this.state.color} />;
      case 2:
        return <ProgressBar progress2={this.state.color} />;
      default:
        return <ProgressBar progress3={this.state.color} />;
    }
  };
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  onSubmit = form => {
    console.log(form);
    this.props.sendReservation(form, () => {
      this.props.history.push(`/signin`);
    });
  };

  render() {
    const { page } = this.state;
    return (
      <div>
        <div className="form-box">
          <div className="row">
            <h4 className="center">Make your Reservation</h4>
            {this.renderProgressBar()}
            {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage} />}
            {page === 2 && (
              <WizardFormSecondPage
                previousPage={this.previousPage}
                onSubmit={this.nextPage}
              />
            )}
            {page === 3 && (
              <WizardFormThirdPage
                previousPage={this.previousPage}
                onSubmit={this.onSubmit}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(WizardForm);
