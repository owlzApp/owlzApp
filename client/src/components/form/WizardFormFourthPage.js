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
    FinalValue
  } = props;

  let date = props.FinalValue.date;
  date = moment(date).format("LL");

  let dateEnd = props.FinalValue.dateEnd;
  dateEnd = moment(dateEnd).format("LL");

  let dateCall = props.FinalValue.dateCall;
  dateCall = moment(dateCall).format("LL");

  let timeCall = props.FinalValue.timeCall;
  timeCall = moment(timeCall).format("LT");

  return (
    <form onSubmit={handleSubmit}>
      <h6 className="center">Did You confirm your reservation?</h6>
      <div className="reservation">
        <p>
          <i className="fas fa-portrait"></i> {FinalValue.firstName}{" "}
          {FinalValue.lastName}
        </p>
        <p>
          date Start: {date}
          date End: {dateEnd}
        </p>
        <p>
          <i className="fas fa-envelope"></i> {FinalValue.email}
        </p>
        <p>
          <i className="far fa-comment-dots"></i> {FinalValue.message}
        </p>
        <p>
          <i className="fas fa-running"></i> {FinalValue.interest}
        </p>
        <p>
          <i className="fas fa-users"></i> {FinalValue.peopleFemale} Women{" "}
          {FinalValue.peopleMale} Man
        </p>
        <p>Time to be call</p>
        at {timeCall} the {dateCall}
        <p>
          <i className="fas fa-mobile-alt"></i> {FinalValue.phone}
        </p>
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
      </div>
    </form>
  );
};
export default reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFourthPage);
