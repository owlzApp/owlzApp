import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import validate from "./validate";
import renderField from "./renderField";
import RenderFieldPhone from "./renderFieldPhone";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";
import "react-widgets/dist/css/react-widgets.css";

momentLocalizer(moment);

const renderDateTime = ({
  input: { onChange },
  meta: { touched, error },
  label
}) => (
  <div>
    <label>{label}</label>
    <DateTimePicker
      date={false}
      onChange={onChange}
      step={30}
      placeholder="Click on the Lock"
    />
    {touched && error && <span className="error-color">{error}</span>}
  </div>
);

const renderDateTimePicker = ({
  input: { onChange, value },
  meta: { touched, error },
  label
}) => (
  <div>
    <label>{label}</label>
    <DateTimePicker
      onChange={onChange}
      format="DD MMM YYYY"
      time={false}
      min={moment().toDate()}
      value={!value ? null : new Date(value)}
      placeholder="Click on the Calendar"
    />
    {touched && error && <span className="error-color">{error}</span>}
  </div>
);

const WizardFormThirdPage = props => {
  const {
    handleSubmit,
    previousPage,
    handleOnChange,
    value,
    pristine,
    reset,
    submitting
  } = props;
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
        <div className="col m6 s12">
          <Field
            name="timeCall"
            label="Time you want to be call"
            date={false}
            component={renderDateTime}
          />
        </div>
        <div className="col m6 s12">
          <Field
            name="dateCall"
            label="Date you want to be call"
            date={false}
            component={renderDateTimePicker}
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
})(WizardFormThirdPage);
