import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";

const renderFieldPhone = ({
  input,
  label,
  value,
  phone,
  type,
  meta: { touched, error }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <PhoneInput
        defaultCountry={"us"}
        value={value}
        onChange={phone}
        {...input}
        placeholder={label}
        type={type}
      />
      {touched && error && <span className="error-color">{error}</span>}
    </div>
  </div>
);

export default renderFieldPhone;
