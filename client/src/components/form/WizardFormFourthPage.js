import React from "react";
import { reduxForm } from "redux-form";
import validate from "./validate";
import moment from "moment";

const WizardFormFourthPage = props => {
  const {
    handleSubmit,
    pristine,
    previousPage,
    submitting,
    FinalValue,
    reset
  } = props;

  let date = props.FinalValue.date;
  date = moment(date).format("LL");

  let dateEnd = props.FinalValue.dateEnd;
  dateEnd = moment(dateEnd).format("LL");

  let dateCall = props.FinalValue.dateCall;
  dateCall = moment(dateCall).format("LL");

  let timeCall = props.FinalValue.timeCall;
  timeCall = moment(timeCall).format("LT");

  const renderInterest = () => {
    return FinalValue.interest.map(function(item, i) {
      return <li key={i}>{item}</li>;
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h6 className="center">Did You confirm your reservation?</h6>
        <div className="reservation">
          <p>
            <i className="fas fa-portrait"></i> {FinalValue.firstName}{" "}
            {FinalValue.lastName}
          </p>
          <p>
            <i className="far fa-calendar-alt"></i> {date} To {dateEnd}
          </p>
          <p>
            <i className="fas fa-envelope"></i> {FinalValue.email}
          </p>
          <p>
            <i className="far fa-comment-dots"></i> {FinalValue.message}
          </p>
          <p>
            <i className="fas fa-running"></i> {renderInterest()}
          </p>
          <p>
            <i className="fas fa-users"></i> {FinalValue.peopleFemale} Women -
            {FinalValue.peopleMale} Man
          </p>
          <p>
            <i className="fas fa-mobile-alt"></i> {FinalValue.phone}
          </p>
          <p>
            <i className="fas fa-phone-square"></i> Time to be call:
          </p>
          <hr></hr>
          At {timeCall} the {dateCall}
        </div>
        <div className="row">
          <button
            type="button"
            className="previous btn left"
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            className="btn sub right"
            type="submit"
            disabled={pristine || submitting}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFourthPage);
