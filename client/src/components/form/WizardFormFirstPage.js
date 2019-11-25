import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";
import "react-widgets/dist/css/react-widgets.css";

momentLocalizer(moment);

const peoples = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+10"];
const genders = ["Male", "Female"];

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

const renderGenderSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Gender...</option>
      {genders.map(val => (
        <option value={val} key={val}>
          {val}
        </option>
      ))}
    </select>
    {touched && error && <span className="error-color">{error}</span>}
  </div>
);

const renderDateTimePicker = ({
  input: { onChange, value },
  meta: { touched, error },
  showTime,
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

const renderDateTime = ({
  input: { onChange },
  meta: { touched, error },
  label
}) => (
  <div>
    <label>{label}</label>
    <DateTimePicker
      date={false}
      min={new Date()}
      onChange={onChange}
      placeholder="Click on the Lock"
    />
    {touched && error && <span className="error-color">{error}</span>}
  </div>
);

let widget = <DateTimePicker date={false} />;

const WizardFormFirstPage = props => {
  const { handleSubmit } = props;
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
            label="Date"
            showTime={false}
            component={renderDateTimePicker}
          />
        </div>
        <div className="col m6 s12">
          <Field
            name="time"
            label="Time"
            date={false}
            component={renderDateTime}
          />
        </div>
      </div>
      <div className="row">
        <div className="col m6 s12">
          <label>Gender</label>
          <Field name="gender" component={renderGenderSelector} />
        </div>
        <div className="col m6 s12">
          <label>How many people</label>
          <Field name="people" component={renderPepoleSelector} />
        </div>
      </div>
      <div>
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
