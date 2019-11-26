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
import { Link } from "react-router-dom";
import BoxImage from "../utils/BoxImage";
import ScrollAnimation from "react-animate-on-scroll";
import M from "materialize-css/dist/js/materialize.min.js";

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
  componentDidMount() {
    const elems = document.querySelectorAll(".datepicker");
    M.Datepicker.init(elems, {});

    const elemCollapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elemCollapsible, {});
  }

  handleOnChange = value => {
    this.setState({ phone: value });
  };

  renderProgressBar = () => {
    switch (this.state.page) {
      case 1:
        return (
          <ProgressBar
            progress={this.state.color}
            animation={this.state.animation}
          />
        );
      case 2:
        return <ProgressBar progress2={this.state.color} />;
      default:
        return <ProgressBar progress3={this.state.color} />;
    }
  };

  nextPage(form) {
    this.setState({ finalValue: form });
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  onSubmit = form => {
    console.log(form);
    this.props.sendReservation(form, () => {
      this.props.history.push(`/`);
    });
  };

  render() {
    const { page } = this.state;
    return (
      <div className="container-fluid">
        <div className="row row-fluid">
          <div className="col m6 col-fluid">
            <BoxImage />
          </div>
          <div className="col m6 s12">
            <div className="block-form">
              <div>{this.renderProgressBar()}</div>
              {page === 1 && (
                <ScrollAnimation animateIn="slideInRight">
                  <WizardFormFirstPage onSubmit={this.nextPage} />
                </ScrollAnimation>
              )}
              {page === 2 && (
                <ScrollAnimation animateIn="slideInRight">
                  <WizardFormSecondPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />
                </ScrollAnimation>
              )}

              {page === 3 && (
                <ScrollAnimation animateIn="slideInRight">
                  <WizardFormThirdPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    handleOnChange={this.handleOnChange}
                    value={this.state.phone}
                    errorPhone={this.state.errorPhone}
                  />
                </ScrollAnimation>
              )}
              {page === 4 && (
                <ScrollAnimation animateIn="slideInRight">
                  <WizardFormFourthPage
                    previousPage={this.previousPage}
                    onSubmit={this.onSubmit}
                    FinalValue={this.state.finalValue}
                  />
                </ScrollAnimation>
              )}
            </div>
          </div>
          <div>
            <Link className="btn back-home right" to="/">
              <i className="far fa-arrow-alt-circle-left"></i> Return home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(WizardForm);
