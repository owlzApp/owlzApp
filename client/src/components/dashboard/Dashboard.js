import React from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import "../css/Dashboard.css";
import _ from "lodash";
import TableDashBoard from "./TableDashbord";
import moment from "moment";
class Dashboard extends React.Component {
  state = {
    initial: true,
    people: false,
    dateCall: false,
    interest: false
  };

  componentDidMount() {
    this.props.getAllReservation();
  }

  renderPeople = () => {
    this.setState({ people: true });
    this.setState({ dateCall: false });
    this.setState({ initial: false });
    this.setState({ interest: false });
  };

  renderInterest = () => {
    this.setState({ people: false });
    this.setState({ dateCall: false });
    this.setState({ initial: false });
    this.setState({ interest: true });
  };

  backToNormal = () => {
    this.setState({ people: false });
    this.setState({ dateCall: false });
    this.setState({ initial: true });
    this.setState({ interest: false });
  };

  renderDateToCall = () => {
    this.setState({ dateCall: true });
    this.setState({ people: false });
    this.setState({ initial: false });
    this.setState({ interest: false });
  };

  render() {
    if (!this.props.reservations.length > 0) {
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
    const people = _.orderBy(this.props.reservations, ["people"], ["desc"]);
    const interest = _.orderBy(this.props.reservations, ["interest"], ["asc"]);
    const dateToCall = _.sortBy(this.props.reservations, "dateCall", function(
      o
    ) {
      return new moment(o.date);
    }).reverse();
    return (
      <div className="Box-table">
        <h4>Dashboard</h4>
        <div>
          <button type="submit" onClick={this.backToNormal}>
            Reset
          </button>
          <button type="submit" onClick={this.renderPeople}>
            By People
          </button>
          <button type="submit" onClick={this.renderDateToCall}>
            Date To Call
          </button>
          <button type="submit" onClick={this.renderInterest}>
            Interest
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
            {/* Render Initial Table */}
            {this.state.initial === true && (
              <TableDashBoard reservations={this.props.reservations} />
            )}
            {/* Render Max Person */}
            {this.state.people === true && (
              <TableDashBoard reservations={people} />
            )}
            {/* Render by Date Call */}
            {this.state.dateCall === true && (
              <TableDashBoard reservations={dateToCall} />
            )}
            {/* Render by Date Call */}
            {this.state.interest === true && (
              <TableDashBoard reservations={interest} />
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
