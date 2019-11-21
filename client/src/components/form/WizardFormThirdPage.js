import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";

const WizardFormThirdPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Notes</label>
        <div>
          <Field name="message" component={renderField} placeholder="message" />
        </div>
      </div>
      <div>
        <div className="row">
          <button type="button" className="previous btn" onClick={previousPage}>
            Previous
          </button>
          <button type="submit" className="next btn right">
            Next
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
})(WizardFormThirdPage);
