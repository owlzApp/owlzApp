import React from "react";
import { connect } from "react-redux";
import * as actions from "../components/actions";
import Banner from "../components/utils/Banner";
import "./css/Alert.css";
import Concept from "./utils/Concept";
import Footer from "./utils/Footer";
import Partner from "./utils/Partner";
import Review from "./utils/Review";
import moment from "moment";

class Welcome extends React.Component {
  state = {
    close: ""
  };

  closeAlert = () => {
    this.setState({ close: "close" });
  };
  renderConfirmation = reservation => {
    if (reservation !== "") {
      return (
        <div className={`alert ${this.state.close}`}>
          <span>
            <p className="close-alert" onClick={this.closeAlert}>
              <i className="far fa-times-circle"></i>
            </p>
            <i className="far fa-check-circle"></i> {reservation.firstName}{" "}
            {reservation.lastName}, your Request is on the way! Owlz team will
            contact you on this number {reservation.phone} around{" "}
            {moment(reservation.timeCall).format("LT")} on the{" "}
            {moment(reservation.dateCall).format("LL")}.
          </span>
        </div>
      );
    } else {
      return null;
    }
  };
  render() {
    const { reservation } = this.props;
    return (
      <div>
        {this.renderConfirmation(reservation)}
        <Banner />
        <Partner />
        <Concept />
        <Review />
        <Footer />
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    authenticated: state.auth.authenticated,
    reservation: state.reservations.reservationSend
  };
}

export default connect(mapStateToPros, actions)(Welcome);
