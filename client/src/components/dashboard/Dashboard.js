import React from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import "../css/Dashboard.css";
import _ from "lodash";

class Dashboard extends React.Component {
  state = {
    people: false
  };

  componentDidMount() {
    this.props.getAllReservation();
  }

  renderPeople = reservations => {
    this.setState({ people: true });
    var people = _.orderBy(reservations, ["type", "people"], ["desc", "desc"]);
    console.log(people);
    return this.renderReservation(people);
  };

  renderCustomField = () => {};

  renderReservation = reservations => {
    console.log(reservations);
    console.log(this.state);
    if (reservations.length >= 0) {
      return reservations.map(reservation => {
        return (
          <tr key={reservation._id}>
            <td>{reservation.firstName}</td>
            <td>{reservation.lastName}</td>
            <td>{reservation.email}</td>
            <td>{reservation.phone}</td>
            <td>{reservation.city}</td>
            <td>
              {reservation.date} To {reservation.dateEnd}
            </td>
            <td>{reservation.interest}</td>
            <td>{reservation.message}</td>
            <td>{reservation.people}</td>
            <td>
              {reservation.dateCall} {reservation.timeCall}
            </td>
          </tr>
        );
      });
    } else {
      return (
        <div style={{ marginTop: "10%" }} className="center">
          <p>Loading...</p>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    if (!this.props.reservations.length > 0) {
      return null;
    }

    return (
      <div className="Box-table">
        <h4>Dashboard</h4>
        <div>
          <button
            type="submit"
            onClick={() => this.renderPeople(this.props.reservations)}
          >
            here
          </button>
        </div>
        <table className="responsive-table striped centered">
          <thead>
            <tr>
              <th>firstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>phone</th>
              <th>City</th>
              <th>Date</th>
              <th>Interest</th>
              <th>Message</th>
              <th>People</th>
              <th>Call </th>
            </tr>
          </thead>
          <tbody>
            {this.renderReservation(this.props.reservations)}
            {this.state.people === true ? (
              this.renderPeople(this.props.reservations)
            ) : (
              <div>nothing</div>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    authenticated: state.auth.authenticated,
    reservations: state.reservations.allReservation
  };
}

export default connect(mapStateToPros, actions)(Dashboard);
