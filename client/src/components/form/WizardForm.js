import React, { Component } from "react";
import WizardFormFirstPage from "./WizardFormFirstPage";
import WizardFormSecondPage from "./WizardFormSecondPage";
import WizardFormThirdPage from "./WizardFormThirdPage";
import WizardFormFourthPage from "./WizardFormFourthPage";
import ProgressBar from "./ProgressBar";
import "../css/formReservation.css";
import "../css/ProgressBar.css";
import { connect } from "react-redux";
import * as actions from "../actions";
import ScrollAnimation from "react-animate-on-scroll";
import { Link } from "react-router-dom";

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      color: "item-active",
      phone: "",
      errorPhone: "",
      finalValue: []
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
  nextPage(form) {
    this.setState({ finalValue: form });
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
      people: form.people,
      message: form.message
    };
    console.log(finalForm);
    this.props.sendReservation(finalForm, () => {
      this.props.history.push(`/`);
    });
  };

  render() {
    const { page } = this.state;
    return (
      <div className="container">
        <h1 className="center">Time to do your Adventure</h1>
        <ScrollAnimation animateIn="fadeInUp">
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
                  onSubmit={this.nextPage}
                />
              )}
              {page === 4 && (
                <WizardFormFourthPage
                  previousPage={this.previousPage}
                  onSubmit={this.onSubmit}
                  FinalValue={this.state.finalValue}
                  Phone={this.state.phone}
                />
              )}
            </div>
          </div>
        </ScrollAnimation>
        <br></br>
        <Link className="btn" to="/">
          back
        </Link>
      </div>
    );
  }
}

export default connect(null, actions)(WizardForm);
