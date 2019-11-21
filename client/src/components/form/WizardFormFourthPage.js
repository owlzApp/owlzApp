import React from "react";
import { reduxForm } from "redux-form";
import validate from "./validate";

const WizardFormFourthPage = props => {
  const {
    handleSubmit,
    pristine,
    previousPage,
    submitting,
    FinalValue,
    Phone
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <h6 className="center">Did You confirm your reservation?</h6>
      <p>
        <i className="fas fa-portrait"></i> {FinalValue.firstName}{" "}
        {FinalValue.lastName}
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
        <i className="fas fa-users"></i> {FinalValue.people}
      </p>
      <p>
        <i className="fas fa-mobile-alt"></i> {Phone}
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
    </form>
  );
};
export default reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFourthPage);
