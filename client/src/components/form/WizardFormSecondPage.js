import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
const interests = [
  "Night Club",
  "Bar",
  "restaurant",
  "Event Outside",
  "Strip Club",
  "Boat",
  "Multiple"
];
const peoples = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+10"];

const renderColorSelector = ({ input, meta: { touched, error } }) => (
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

const renderPepoleSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Number...</option>
      {peoples.map(val => (
        <option value={val} key={val}>
          {val}
        </option>
      ))}
    </select>
    {touched && error && <span className="error-color">{error}</span>}
  </div>
);

const WizardFormSecondPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col m6 s12">
          <label>Principal Interest or Activity</label>
          <Field name="interest" component={renderColorSelector} />
        </div>
        <div className="col m6 s12">
          <label>How many people</label>
          <Field name="people" component={renderPepoleSelector} />
        </div>
      </div>
      <div>
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
})(WizardFormSecondPage);
