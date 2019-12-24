import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import { Link } from "react-router-dom";
import { SelectList } from "react-widgets";
import "react-widgets/dist/css/react-widgets.css";

const interests = [
  "Bottle Service",
  "Restaurant Reservations",
  "Accommodations",
  "Seasonal Events",
  "Transportation",
  "Yachts & Boats"
];

const renderSelectList = ({ input, data, label, meta: { touched, error } }) => (
  <div>
    <label style={{ marginBottom: "10px" }}>{label}</label>
    <SelectList
      {...input}
      onBlur={() => input.onBlur()}
      value={input.value || []}
      multiple={true}
      data={data}
    />
    {touched && error && <span className="error-color">{error}</span>}
  </div>
);

const renderFieldMessage = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type={type} />
      {touched && error && <span className="error-color">{error}</span>}
    </div>
  </div>
);

const WizardFormSecondPage = props => {
  const { handleSubmit, previousPage, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col m12 s12">
          <Field
            name="interest"
            component={renderSelectList}
            data={interests}
            label="Select Interest(s)"
          />
        </div>
        <div className="col m12 s12">
          <br></br>
          <Field
            label="Message"
            name="message"
            type="text"
            component={renderFieldMessage}
            placeholder="Examples: Language, Occasion, Additional Information"
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
