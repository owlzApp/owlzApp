import React, { Component } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";
class renderFieldPhone extends Component {
  render() {
    return (
      <div>
        <label>Phone</label>
        <div>
          <PhoneInput
            defaultCountry={"us"}
            value={this.props.value}
            onChange={this.props.phone}
          />
        </div>
      </div>
    );
  }
}

export default renderFieldPhone;
