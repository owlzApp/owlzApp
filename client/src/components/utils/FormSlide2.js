import React from "react";
import { Field } from "redux-form";

const FormSilde2 = props => {
  const { next, prev, handleChange } = props;
  return (
    <div>
      <div id="progressbar">
        <div className="step1 item">
          <p>1</p>
        </div>
        <div className="step1 item active">
          <p>2</p>
        </div>
        <div className="step1 item">
          <p>3</p>
        </div>
      </div>
      <div className="row">
        <div className="col 6">
          <Field
            name="message"
            type="text"
            component="input"
            autoComplete="none"
            placeholder="message"
            onChange={handleChange}
          />
        </div>
        <div className="col 6">
          <Field
            name="firstName"
            type="text"
            component="input"
            autoComplete="none"
            placeholder="First Name"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <button onClick={prev} type="button">
          prev
        </button>
        <button onClick={next} type="button">
          next
        </button>
      </div>
    </div>
  );
};

export default FormSilde2;
