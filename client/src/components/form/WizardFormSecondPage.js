import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";
import { Link } from "react-router-dom";
const interests = [
  "Nightclubs",
  "Restaurants",
  "Living Accommodations",
  "Events",
  "Cars",
  "Yachts & Boats",
  "Multiple"
];

const renderInterestSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Select your interest...</option>
      {interests.map(val => (
        <option value={val} key={val}>
          {val}
        </option>
      ))}
    </select>
    {touched && error && <span className="error-color">{error}</span>}
  </div>
);

const WizardFormSecondPage = props => {
  const { handleSubmit, previousPage, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col m12 s12">
          <label>Principal Interest or Activity</label>
          <Field name="interest" component={renderInterestSelector} />
        </div>
        <br></br>
        <div className="col m12 s12">
          <Field
            label="Message"
            name="message"
            type="text"
            component={renderField}
            placeholder="Any additional information ex. special occasion"
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
      <div className="row">
        <button
          className="back-home left"
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
        >
          <Link to="/">
            <i className="far fa-arrow-alt-circle-left"></i> Return home
          </Link>
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
})(WizardFormSecondPage);
