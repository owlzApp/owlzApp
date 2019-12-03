import React from "react";
import moment from "moment";

const TableDashBoard = props => {
  const { reservations } = props;
  console.log(reservations);
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
            {moment(reservation.date).format("LL")} To{" "}
            {moment(reservation.dateEnd).format("LL")}
          </td>
          <td>{reservation.interest}</td>
          <td>{reservation.message}</td>
          <td>{reservation.people}</td>
          <td>
            {moment(reservation.dateCall).format("LL")}{" "}
            {moment(reservation.timeCall).format("LT")}
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

export default TableDashBoard;
