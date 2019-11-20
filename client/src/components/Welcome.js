import React from "react";
import { connect } from "react-redux";
import * as actions from "../components/actions";
import Banner from "../components/utils/Banner";
import "./css/Alert.css";

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
            <i className="far fa-check-circle"></i> {reservation.firstName}{" "}
            {reservation.lastName}, your Request is on the way! You will be in
            relation with owlz team soon...
            <b className="close-alert" onClick={this.closeAlert}>
              X
            </b>
          </span>
        </div>
      );
    } else {
      return null;
    }
  };
  render() {
    const { reservation } = this.props;
    console.log(reservation);
    return (
      <div>
        {this.renderConfirmation(reservation)}
        <Banner />
      </div>
    );
  }
}

function mapStateToPros(state) {
  console.log(state);
  return {
    authenticated: state.auth.authenticated,
    reservation: state.reservations.reservationSend
  };
}

export default connect(mapStateToPros, actions)(Welcome);
