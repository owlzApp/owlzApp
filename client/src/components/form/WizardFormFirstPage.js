import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import validate from "./validate";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";
import "react-widgets/dist/css/react-widgets.css";
import NumericInput from "react-numeric-input";
import Collapsible from "react-collapsible";
const interests = ["Miami"];
momentLocalizer(moment);

const WizardFormFirstPage = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    value,
    handleOnChangeFemale,
    handleOnChangeMale,
    whenSeletedDate,
    startDate,
    handleInputClick,
    handleToggle,
    handleToggleEnd,
    handleInputClickEnd,
    open,
    openEnd,
    arrowMove,
    arrow
  } = props;

  const renderDateTimePicker = ({
    input: { onChange, value },
    meta: { touched, error },
    label,
    handleInputClick,
    handleToggle,
    open
  }) => (
    <div>
      <label>{label}</label>
      <DateTimePicker
        onChange={onChange}
        onSelect={whenSeletedDate(value)}
        format="DD MMM YYYY"
        onClick={handleInputClick}
        onToggle={handleToggle}
        open={open}
        time={false}
        min={moment().toDate()}
        value={!value ? null : new Date(value)}
        placeholder="24 Dec 2019"
      />
      {touched && error && <span className="error-color">{error}</span>}
    </div>
  );

  const renderEndDateTimePicker = ({
    input: { onChange, value },
    meta: { touched, error },
    startDate,
    openEnd,
    label,
    handleInputClickEnd,
    handleToggleEnd
  }) => (
    <div>
      <label>{label}</label>
      <DateTimePicker
        onChange={onChange}
        format="DD MMM YYYY"
        time={false}
        onClick={handleInputClickEnd}
        onToggle={handleToggleEnd}
        open={openEnd}
        min={startDate === undefined ? null : new Date(startDate)}
        value={!value ? null : new Date(value)}
        placeholder="25 Dec 2019"
      />
      {touched && error && <span className="error-color">{error}</span>}
    </div>
  );

  const renderFieldCount = ({
    input,
    label,
    type,

    meta: { error, touched }
  }) => (
    <div className="block-collaps">
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
      {touched && error && <span className="error-color"> {error}</span>}
    </div>
  );

  const renderFieldCountTotal = ({ input, type, gender, icon }) => (
    <div>
      <div className="input-form">
        <NumericInput
          mobile
          className="form-control"
          min={0}
          max={100}
          {...input}
          type={type}
        />
        <span>
          <i class={`fas ${icon}`}></i> {gender}
        </span>
      </div>
    </div>
  );

  const renderError = ({ meta: { error, touched } }) => (
    <div>
      {touched && error && <span className="error-color"> {error}</span>}
    </div>
  );

  const renderTitleCollaps = (value, arrow) => {
    return (
      <div onClick={arrowMove}>
        <div className="right">
          <i class={`fas ${arrow}`}></i>
        </div>

        <div class="flex-container">
          <div className="hidden-input">
            <Field
              name="peopleFemale"
              type="number"
              gender="Women"
              component={renderFieldCountTotal}
              icon="fa-female"
            />
          </div>
          ,
          <div className="hidden-input">
            <Field
              gender="Man"
              name="peopleMale"
              type="number"
              component={renderFieldCountTotal}
              icon="fa-male"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderCitySelector = ({ input, label, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <select {...input}>
        <option value="">Select your city...</option>
        {interests.map(val => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
      {touched && error && <span className="error-color">{error}</span>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col m6 s12">
          <Field
            name="city"
            type="text"
            component={renderCitySelector}
            label="City"
          />
        </div>
        <div className="col m6 s12"></div>
      </div>
      <div className="row">
        <div className="col m6 s12">
          <Field
            name="date"
            label="Arrival"
            showTime={false}
            component={renderDateTimePicker}
            handleInputClick={handleInputClick}
            handleToggle={handleToggle}
            open={open}
          />
        </div>
        <div className="col m6 s12">
          <Field
            name="dateEnd"
            label="Departure"
            showTime={false}
            startDate={startDate}
            component={renderEndDateTimePicker}
            handleInputClickEnd={handleInputClickEnd}
            handleToggleEnd={handleToggleEnd}
            openEnd={openEnd}
          />
        </div>
      </div>
      <div className="row">
        <div className="col m6 s12">
          <label>Guest</label>
          {<Field name="peopleFemale" component={renderError} />}
          <Collapsible
            className="box-collaps"
            trigger={renderTitleCollaps(value, arrow)}
          >
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
          </Collapsible>
        </div>
      </div>
      <div className="row">
        <button type="submit" className="next btn right">
          Next
        </button>
      </div>
      <div className="row">
        <button
          className="back-home right"
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
  form: "wizard", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage);
