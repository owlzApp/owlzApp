import React from "react";
import { Field } from "redux-form";
import normalizePhone from "./normalizePhone";

const FormSilde3 = props => {
  const { prev, handleChange, onSubmit } = props;
  return (
    <div>
      <div id="progressbar">
        <div className="step1 item">
          <p>1</p>
        </div>
        <div className="step1 item">
          <p>2</p>
        </div>
        <div className="step1 item active">
          <p>3</p>
        </div>
      </div>
      <div className="row">
        <div className="col 6">
          <Field
            name="phone"
            type="text"
            component="input"
            autoComplete="none"
            placeholder="Phone"
            onChange={handleChange}
            normalize={normalizePhone}
          />
        </div>
        <div className="col 6">
          <Field
            name="age"
            type="number"
            component="input"
            autoComplete="none"
            placeholder="age"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <button onClick={prev} type="button">
          back
        </button>
        <button onClick={onSubmit} type="button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormSilde3;
