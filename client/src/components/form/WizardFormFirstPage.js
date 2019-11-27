import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";
import "react-widgets/dist/css/react-widgets.css";
import NumericInput from "react-numeric-input";
import M from "materialize-css/dist/js/materialize.min.js";

momentLocalizer(moment);

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

const renderFieldCount = ({ input, label, type }) => (
  <div>
    <label style={{ display: "block" }} className="center">
      {label}
    </label>
    <div>
      <NumericInput
        mobile
        className="form-control"
        min={0}
        max={100}
        {...input}
        type={type}
      />
    </div>
  </div>
);

const renderFieldCountTotal = ({
  input,
  label,
  value,
  type,
  meta: { touched, error }
}) => (
  <div>
    <div {...input} value={value} placeholder={label} type={type}>
      {value}
    </div>
    <div>
      {touched && error && <span className="error-color">{error}</span>}
    </div>
  </div>
);

const WizardFormFirstPage = props => {
  const {
    handleSubmit,
    value,
    handleOnChangeFemale,
    handleOnChangeMale
  } = props;

  const valueError = () => {
    if (value === 0) {
      return <div className="error-color-count">minimum one person</div>;
    }
  };

  // Collasible
  const elemCollapsible = document.querySelectorAll(".collapsible");
  M.Collapsible.init(elemCollapsible, {});

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col m6 s12">
          <Field name="city" type="text" component={renderField} label="City" />
        </div>
        <div className="col m6 s12"></div>
      </div>
      <div className="row">
        <div className="col m6 s12">
          <Field
            name="date"
            label="Date Arrive"
            showTime={false}
            component={renderDateTimePicker}
          />
        </div>
        <div className="col m6 s12">
          <Field
            name="dateEnd"
            label="Date Ending"
            showTime={false}
            component={renderDateTimePicker}
          />
        </div>
      </div>
      <div className="row">
        <div className="col m6 s12">
          <label>People</label>
          <ul className="collapsible">
            <li>
              <div className="collapsible-header">
                <i className="material-icons">person</i>
                <span>Number of person: {value}</span>
              </div>
              <div className="collapsible-body fix-click">
                <Field
                  name="peopleFemale"
                  type="number"
                  component={renderFieldCount}
                  label="Female"
                  onChange={handleOnChangeFemale}
                />
                <Field
                  name="peopleMale"
                  type="number"
                  component={renderFieldCount}
                  label="Male"
                  onChange={handleOnChangeMale}
                />
              </div>
            </li>
          </ul>
          <Field
            name="people"
            type="number"
            component={renderFieldCountTotal}
            label="People"
            value={value}
            validate={valueError}
          />
        </div>
      </div>
      <div className="row">
        <button type="submit" className="next btn right">
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
