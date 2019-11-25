import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";
import RenderFieldPhone from "./renderFieldPhone";

const WizardFormThirdPage = props => {
  const { handleSubmit, previousPage, handleOnChange, value } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col m6 s12">
          <Field
            name="firstName"
            type="text"
            component={renderField}
            label="First Name"
          />
        </div>
        <div className="col m6 s12">
          <Field
            name="lastName"
            type="text"
            component={renderField}
            label="Last Name"
          />
        </div>
      </div>
      <div className="row">
        <div className="col m6 s12">
          <Field
            name="email"
            type="email"
            component={renderField}
            label="Email"
          />
        </div>
        <div className="col m6 s12">
          <Field
            name="phone"
            label="Phone"
            phone={handleOnChange}
            value={value}
            component={RenderFieldPhone}
          />
        </div>
      </div>
      <div className="row">
        <button
          type="button"
          className="previous btn left"
          onClick={previousPage}
        >
          Previous
        </button>
        <button type="submit" className="next btn right">
          Next
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
})(WizardFormThirdPage);
