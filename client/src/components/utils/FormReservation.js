import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as actions from "../actions";
import "../css/formReservation.css";
import FormSilde1 from "./FormSlide1";
import FormSilde2 from "./FormSlide2";
import FormSilde3 from "./FormSlide3";
import "../css/ProgressBar.css";

class FormReservation extends React.Component {
  state = {
    step: 1,
    firstName: "",
    email: "",
    age: "",
    phone: "",
    message: "",
    backgroundColor1: "true"
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
    console.log(this.state.step);
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
    console.log(this.state.step);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = () => {
    const { firstName, email, age, phone, message } = this.state;
    const form = {
      firstName: firstName,
      email: email,
      age: age,
      phone: phone,
      message: message
    };
    console.log(form);
    if ((firstName, email, age, phone, message)) {
      this.props.sendReservation(form, () => {
        this.props.history.push(`/`);
      });
    }
  };

  RenderMultipleStep = () => {
    switch (this.state.step) {
      case 1:
        return (
          <FormSilde1 next={this.nextStep} handleChange={this.handleChange} />
        );
      case 2:
        return (
          <FormSilde2
            next={this.nextStep}
            prev={this.prevStep}
            handleChange={this.handleChange}
          />
        );
      case 3:
        return (
          <FormSilde3
            prev={this.prevStep}
            onSubmit={this.onSubmit}
            handleChange={this.handleChange}
          />
        );
      default:
        return <div>Error</div>;
    }
  };

  render() {
    return (
      <div className="form-box">
        <div className="row">
          <h4 className="center">Make your Reservation</h4>
          {this.RenderMultipleStep()}
        </div>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    reservations: state.auth.reservation
  };
}

export default compose(
  connect(mapStateToPros, actions),
  reduxForm({ form: "reservation" })
)(FormReservation);
