import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";
import "react-widgets/dist/css/react-widgets.css";
import Counter from "./Counter";

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
          <Field component={Counter} />
        </div>
        <div className="col m6 s12"></div>
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
