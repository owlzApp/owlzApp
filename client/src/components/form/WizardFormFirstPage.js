import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";

const WizardFormFirstPage = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col m6">
          <Field
            name="firstName"
            type="text"
            component={renderField}
            label="First Name"
          />
        </div>
        <div className="col m6">
          <Field
            name="lastName"
            type="text"
            component={renderField}
            label="Last Name"
          />
        </div>
      </div>
      <div className="row">
        <div className="col m6">
          <Field
            name="phone"
            type="number"
            component={renderField}
            label="Phone"
          />
        </div>
        <div className="col m6">
          <Field
            name="email"
            type="email"
            component={renderField}
            label="Email"
          />
        </div>
      </div>
      <div>
        <button type="submit" className="next">
          Next
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "wizard", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage);
