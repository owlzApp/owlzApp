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
      countFemale: 0,
      countMale: 0,
      startDate: new Date(),
      CountTotal: 0,
      finalValue: [],
      openEnd: "false",
      open: "false",
      arrow: "fa-sort-down",
      arrowCall: "fa-sort-down"
    };
  }

  componentDidMount() {
    const elemCollapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elemCollapsible, {});

    const elems = document.querySelectorAll(".datepicker");
    M.Datepicker.init(elems, {});
  }

  handleInputClick = event => {
    if (event.target.tagName === "INPUT") {
      this.setState({ open: "date" });
    }
  };

  handleInputClickEnd = event => {
    if (event.target.tagName === "INPUT") {
      this.setState({ openEnd: "date" });
    }
  };

  handleToggle = () => {
    var toggledState = this.state.open ? false : "date";
    this.setState({ open: toggledState });
    this.setState({ openEnd: "date" });
  };

  handleToggleEnd = () => {
    var toggledState = this.state.openEnd ? false : "date";
    this.setState({ openEnd: toggledState });
    this.setState({ open: "false" });
  };

  whenSeletedDate = value => {
    this.setState({ startDate: value });
  };

  handleOnChangeCountFemale = value => {
    this.setState({ countFemale: value });
    this.setState({ CountTotal: this.state.countMale + value });
  };

  handleOnChangeCountMale = value => {
    this.setState({ countMale: value });
    this.setState({ CountTotal: this.state.countFemale + value });
  };

  // Input Call back Page 3
  handleInputClickEndTime = event => {
    if (event.target.tagName === "INPUT") {
      this.setState({ openEnd: "time" });
    }
  };

  handleToggleTime = () => {
    var toggledState = this.state.open ? false : "date";
    this.setState({ open: toggledState });
    this.setState({ openEnd: "time" });
  };

  arrowMove = () => {
    if (this.state.arrow === "fa-sort-down") {
      this.setState({ arrow: "fa-sort-up" });
    } else {
      this.setState({ arrow: "fa-sort-down" });
    }
  };

  arrowMoveTime = () => {
    if (this.state.arrowCall === "fa-sort-down") {
      this.setState({ arrowCall: "fa-sort-up" });
    } else {
      this.setState({ arrowCall: "fa-sort-down" });
    }
  };

  //Input Phone page 3
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
    console.log(form);
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  onSubmit = form => {
    form = {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      interest: form.interest,
      city: form.city,
      date: form.date,
      dateEnd: form.dateEnd,
      people: this.state.CountTotal,
      peopleFemale: form.peopleFemale,
      peopleMale: form.peopleMale,
      message: form.message,
      dateCall: form.dateCall,
      timeCall: form.timeCall
    };
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
                  <WizardFormFirstPage
                    onSubmit={this.nextPage}
                    handleOnChangeFemale={this.handleOnChangeCountFemale}
                    handleOnChangeMale={this.handleOnChangeCountMale}
                    value={this.state.CountTotal}
                    whenSeletedDate={this.whenSeletedDate}
                    startDate={this.state.startDate}
                    handleInputClick={this.handleInputClick}
                    handleToggle={this.handleToggle}
                    handleToggleEnd={this.handleToggleEnd}
                    handleInputClickEnd={this.handleInputClickEnd}
                    open={this.state.open}
                    openEnd={this.state.openEnd}
                    arrowMove={this.arrowMove}
                    arrow={this.state.arrow}
                  />
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
                    handleInputClick={this.handleInputClick}
                    open={this.state.open}
                    handleInputClickEndTime={this.handleInputClickEndTime}
                    handleToggleTime={this.handleToggleTime}
                    handleToggleEnd={this.handleToggleEnd}
                    openEnd={this.state.openEnd}
                    arrowMoveTime={this.arrowMoveTime}
                    arrowCall={this.state.arrowCall}
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
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(WizardForm);
