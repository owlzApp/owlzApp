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
    countFemale,
    countMale,
    handleSubmit,
    pristine,
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
    <div className="block-collaps">
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
        placeholder="mm/dd/yyyy "
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
    <div className="block-collaps">
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
        placeholder="mm/dd/yyyy "
      />
      {touched && error && <span className="error-color">{error}</span>}
    </div>
  );

  const renderFieldCount = ({
    input: { onChange, value },
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
          onChange={onChange}
          mobile
          className="form-control"
          min={0}
          max={100}
          value={!value ? 0 : value}
          type={type}
        />
      </div>
      {touched && error && <span className="error-color"> {error}</span>}
    </div>
  );

  const renderFieldCountTotal = ({
    input: { onChange, value },
    type,
    gender,
    icon
  }) => (
    <div>
      <div className="input-form">
        <NumericInput
          onChange={onChange}
          mobile
          className="form-control"
          min={0}
          max={100}
          type={type}
          value={!value ? 0 : value}
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
      <div className="box-collaps" onClick={arrowMove}>
        <div className="right">
          <i class={`fas ${arrow}`}></i>
        </div>

        <div class="flex-container">
          <div className="hidden-input">
            <Field
              gender="Man"
              name="peopleMale"
              type="number"
              component={renderFieldCountTotal}
              icon="fa-male"
              value={countMale}
            />
          </div>
          ,
          <div className="hidden-input">
            <Field
              name="peopleFemale"
              type="number"
              gender="Women"
              component={renderFieldCountTotal}
              icon="fa-female"
              value={countFemale}
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
          <label>Guests</label>
          {<Field name="peopleFemale" component={renderError} />}
          <Collapsible trigger={renderTitleCollaps(value, arrow)}>
            <Field
              name="peopleMale"
              type="number"
              component={renderFieldCount}
              label="Man"
              handleOnChange={handleOnChangeMale}
              value={countFemale}
            />
            <Field
              name="peopleFemale"
              type="number"
              component={renderFieldCount}
              label="Women"
              handleOnChange={handleOnChangeFemale}
              value={countMale}
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
