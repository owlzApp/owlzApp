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
    interest: false,
    city: false,
    date: false,
    book: false
  };

  bookConfirmation = (id, form) => {
    const formfinal = {
      id: id,
      form: form
    };
    this.props.confirmBook(formfinal);
    this.props.getAllReservation();
  };

  deleteConfirmation = form => {
    this.props.deleteReservation(form);
    this.props.getAllReservation();
  };

  // componentWillReceiveProps(nextProp) {
  //   console.log(nextProp);
  // }

  componentDidMount() {
    this.props.getAllReservation();
  }

  renderPeople = () => {
    this.setState({ people: true });
    this.setState({ dateCall: false });
    this.setState({ initial: false });
    this.setState({ interest: false });
    this.setState({ city: false });
    this.setState({ date: false });
    this.setState({ book: false });
  };

  renderInterest = () => {
    this.setState({ people: false });
    this.setState({ dateCall: false });
    this.setState({ initial: false });
    this.setState({ interest: true });
    this.setState({ city: false });
    this.setState({ date: false });
    this.setState({ book: false });
  };

  backToNormal = () => {
    this.setState({ book: false });
    this.setState({ people: false });
    this.setState({ dateCall: false });
    this.setState({ initial: true });
    this.setState({ interest: false });
    this.setState({ city: false });
    this.setState({ date: false });
  };

  renderDateToCall = () => {
    this.setState({ dateCall: true });
    this.setState({ people: false });
    this.setState({ initial: false });
    this.setState({ interest: false });
    this.setState({ city: false });
    this.setState({ date: false });
    this.setState({ book: false });
  };

  renderCity = () => {
    this.setState({ dateCall: false });
    this.setState({ people: false });
    this.setState({ initial: false });
    this.setState({ interest: false });
    this.setState({ city: true });
    this.setState({ date: false });
    this.setState({ book: false });
  };

  renderDate = () => {
    this.setState({ dateCall: false });
    this.setState({ people: false });
    this.setState({ initial: false });
    this.setState({ interest: false });
    this.setState({ city: false });
    this.setState({ date: true });
    this.setState({ book: false });
  };

  renderBook = () => {
    this.setState({ dateCall: false });
    this.setState({ people: false });
    this.setState({ initial: false });
    this.setState({ interest: false });
    this.setState({ city: false });
    this.setState({ date: false });
    this.setState({ book: true });
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
    // Conter Book Customer
    const totalCustomer = this.props.reservations.length;
    let countNoDeal = 0;
    let countDeal = 0;
    let pending = 0;
    for (let i = 0; i < this.props.reservations.length; i++) {
      if (this.props.reservations[i].book === false) {
        countNoDeal += 1;
      }
      if (this.props.reservations[i].book === true) {
        countDeal += 1;
      }
      if (this.props.reservations[i].book === undefined) {
        pending += 1;
      }
    }

    // Loadash Button filter
    const people = _.orderBy(this.props.reservations, ["people"], ["desc"]);
    const interest = _.orderBy(this.props.reservations, ["interest"], ["asc"]);
    const dateToCall = _.sortBy(this.props.reservations, "dateCall", function(
      o
    ) {
      return new moment(o.date);
    }).reverse();
    const date = _.sortBy(this.props.reservations, "date", function(o) {
      return new moment(o.date);
    }).reverse();
    const city = _.sortBy(this.props.reservations, ["city"], ["asc"]);
    const deal = _.sortBy(this.props.reservations, ["book"]);
    // End

    return (
      <div className="Box-table">
        <h4>Dashboard {totalCustomer}</h4>
        <ul>
          <li>
            Deal <i className="far fa-thumbs-up"></i>: {countDeal}
          </li>
          <li>
            No Deal <i className="far fa-thumbs-down"></i>: {countNoDeal}
          </li>
          <li>
            Pending <i className="far fa-pause-circle"></i>: {pending}
          </li>
        </ul>
        <div>
          <button
            className="btn-filter"
            type="submit"
            onClick={this.backToNormal}
          >
            Reset
          </button>
          <button
            className="btn-filter"
            type="submit"
            onClick={this.renderPeople}
          >
            Max People
          </button>
          <button
            className="btn-filter"
            type="submit"
            onClick={this.renderDateToCall}
          >
            Date To Call
          </button>
          <button
            className="btn-filter"
            type="submit"
            onClick={this.renderInterest}
          >
            Interest
          </button>
          <button
            className="btn-filter"
            type="submit"
            onClick={this.renderCity}
          >
            City
          </button>
          <button
            className="btn-filter"
            type="submit"
            onClick={this.renderDate}
          >
            Date Starting
          </button>
          <button
            className="btn-filter"
            type="submit"
            onClick={this.renderBook}
          >
            Reserved
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
              <th>Reserved</th>
            </tr>
          </thead>
          <tbody>
            {/* Render Initial Table */}
            {this.state.initial === true && (
              <TableDashBoard
                reservations={this.props.reservations}
                bookConfirmation={this.bookConfirmation}
                deleteConfirmation={this.deleteConfirmation}
              />
            )}
            {/* Render Max Person */}
            {this.state.people === true && (
              <TableDashBoard
                reservations={people}
                bookConfirmation={this.bookConfirmation}
                deleteConfirmation={this.deleteConfirmation}
              />
            )}
            {/* Render by Date Call */}
            {this.state.dateCall === true && (
              <TableDashBoard
                reservations={dateToCall}
                bookConfirmation={this.bookConfirmation}
                deleteConfirmation={this.deleteConfirmation}
              />
            )}
            {/* Render by Interest */}
            {this.state.interest === true && (
              <TableDashBoard
                reservations={interest}
                bookConfirmation={this.bookConfirmation}
                deleteConfirmation={this.deleteConfirmation}
              />
            )}
            {/* Render by City */}
            {this.state.city === true && (
              <TableDashBoard
                reservations={city}
                bookConfirmation={this.bookConfirmation}
                deleteConfirmation={this.deleteConfirmation}
              />
            )}
            {/* Render by Date */}
            {this.state.date === true && (
              <TableDashBoard
                reservations={date}
                bookConfirmation={this.bookConfirmation}
                deleteConfirmation={this.deleteConfirmation}
              />
            )}
            {/* Render by Book */}
            {this.state.book === true && (
              <TableDashBoard
                reservations={deal}
                bookConfirmation={this.bookConfirmation}
                deleteConfirmation={this.deleteConfirmation}
              />
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
