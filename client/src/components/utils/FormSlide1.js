import React from "react";
import { Field } from "redux-form";

const FormSilde1 = props => {
  const { preogressOne, next, handleChange } = props;
  return (
    <div>
      <div id="progressbar">
        <div className="step1 item active">
          <p>1</p>
        </div>
        <div className="step1 item">
          <p>2</p>
        </div>
        <div className="step1 item">
          <p>3</p>
        </div>
      </div>
      <Field
        name="email"
        type="email"
        component="input"
        autoComplete="none"
        placeholder="email"
        onChange={handleChange}
      />
      <button onClick={next} type="button">
        next
      </button>
    </div>
  );
};

export default FormSilde1;
