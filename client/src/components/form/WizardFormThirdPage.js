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
import Collapsible from "react-collapsible";

momentLocalizer(moment);

const WizardFormThirdPage = props => {
  const {
    handleSubmit,
    previousPage,
    handleOnChange,
    value,
    pristine,
    reset,
    submitting,
    arrowCall,
    arrowMoveTime,
    handleInputClick,
    open,
    handleInputClickEndTime,
    handleToggleEnd,
    handleToggleTime,
    openEnd
  } = props;

  const renderDateTimePicker = ({
    input: { onChange, value },
    label,
    open,
    handleInputClick,
    handleToggleTime
  }) => (
    <div className="block-collaps">
      <label>Step 1:</label>
      <br></br>
      <label>{label}</label>
      <DateTimePicker
        onChange={onChange}
        onClick={handleInputClick}
        onToggle={handleToggleTime}
        open={open}
        format="DD MMM YYYY"
        time={false}
        min={moment().toDate()}
        value={!value ? null : new Date(value)}
        placeholder="Click on the Calendar"
      />
    </div>
  );

  const renderDateTime = ({
    input: { onChange, value },
    label,
    handleInputClickEndTime,
    handleToggleEnd,
    openEnd
  }) => (
    <div className="block-collaps">
      <label>Step 2:</label>
      <br></br>
      <label>{label}</label>
      <DateTimePicker
        onChange={onChange}
        onClick={handleInputClickEndTime}
        onToggle={handleToggleEnd}
        open={openEnd}
        value={!value ? null : new Date(value)}
        date={false}
        step={30}
        placeholder="Click on the Lock"
      />
      <span className="asterik-time">*Eastern Standard Time</span>
    </div>
  );

  const renderError = ({ meta: { touched, error } }) => (
    <div className="">
      {touched && error && <span className="error-color">{error}</span>}
    </div>
  );

  const labelForCollaps = arrowCall => {
    return (
      <div
        style={{ color: "#d4af37", marginBottom: "40px" }}
        className="box-collaps"
        onClick={arrowMoveTime}
      >
        <div className="right">
          <i class={`fas ${arrowCall}`}></i>
        </div>
        <div className="center">
          <i className="far fa-clock"></i> Schedule call with Owlz Liaison
        </div>
      </div>
    );
  };

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
      <Field name="timeCall" component={renderError} />
      <Field name="dateCall" component={renderError} />
      <Collapsible trigger={labelForCollaps(arrowCall)}>
        <div className="row">
          <div className="col m6 s12">
            <Field
              name="dateCall"
              label="Date you want to be call"
              date={false}
              component={renderDateTimePicker}
              open={open}
              handleInputClick={handleInputClick}
              handleToggleTime={handleToggleTime}
            />
          </div>
          <div className="col m6 s12">
            <Field
              name="timeCall"
              label="Time you want to be call"
              date={false}
              component={renderDateTime}
              openEnd={openEnd}
              handleInputClickEndTime={handleInputClickEndTime}
              handleToggleEnd={handleToggleEnd}
            />
          </div>
        </div>
      </Collapsible>
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
