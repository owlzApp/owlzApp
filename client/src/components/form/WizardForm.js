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
      color: "blue",
      phone: "",
      errorPhone: ""
    };
  }

  handleOnChange = value => {
    this.setState({ phone: value });
  };

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
    if (this.state.phone !== "" && this.state.phone !== "+") {
      this.setState({ page: this.state.page + 1 });
      this.setState({ errorPhone: "" });
    } else {
      this.setState({ errorPhone: "phone must be required" });
    }
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  onSubmit = form => {
    const finalForm = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: this.state.phone,
      interest: form.interest,
      people: form.people
    };
    console.log(finalForm);
    // this.props.sendReservation(finalForm, () => {
    //   this.props.history.push(`/signin`);
    // });
  };

  render() {
    const { page } = this.state;
    return (
      <div>
        <div className="form-box">
          <div className="row">
            <h4 className="center">Make your Reservation</h4>
            {this.renderProgressBar()}
            {page === 1 && (
              <WizardFormFirstPage
                onSubmit={this.nextPage}
                handleOnChange={this.handleOnChange}
                value={this.state.phone}
                errorPhone={this.state.errorPhone}
              />
            )}
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
