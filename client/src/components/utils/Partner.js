import React from "react";
import "../css/Partners.css";

class Partner extends React.Component {
  render() {
    return (
      <div className="Partner">
        <div className="container center">
          <div className="row">
            <h3>Partner</h3>
            <hr></hr>
          </div>
          <div className="row">
            <div className="col m3 s12">
              <img
                src={process.env.PUBLIC_URL + "/images/logo.png"}
                className="logo"
                alt="logo"
              />
              <p>Logo's partner</p>
            </div>
            <div className="col m3 s12">
              <img
                src={process.env.PUBLIC_URL + "/images/logo.png"}
                className="logo"
                alt="logo"
              />
              <p>Logo's partner</p>
            </div>
            <div className="col m3 s12">
              <img
                src={process.env.PUBLIC_URL + "/images/logo.png"}
                className="logo"
                alt="logo"
              />
              <p>Logo's partner</p>
            </div>
            <div className="col m3 s12">
              <img
                src={process.env.PUBLIC_URL + "/images/logo.png"}
                className="logo"
                alt="logo"
              />
              <p>Logo's partner</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Partner;
