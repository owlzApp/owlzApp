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
      <p>Your resumer before submit</p>
      <p>{FinalValue.firstName}</p>
      <p>{FinalValue.lastName}</p>
      <p>{FinalValue.email}</p>
      <p>{FinalValue.message}</p>
      <p>{FinalValue.interest}</p>
      <p>{FinalValue.people}</p>
      <p>{Phone}</p>
      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" disabled={pristine || submitting}>
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
