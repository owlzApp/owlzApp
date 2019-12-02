import React from "react";
import "../css/Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="">About Us</h5>
              <p className="text-lighten-4">
                Connect with a VIP Liaison in the city you are traveling to and
                Create personalized itenerary for a perfect trip
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5>Links</h5>
              <ul>
                <li>
                  <a className="text-lighten-3" href="#!">
                    <i className="fab fa-facebook-square"></i> Facebook
                  </a>
                </li>
                <li>
                  <a className="text-lighten-3" href="#!">
                    <i className="fab fa-instagram"></i> Instagram
                  </a>
                </li>
                <li>
                  <a className="text-lighten-3" href="#!">
                    <i className="fas fa-file-contract"></i> Terms and
                    Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div style={{ paddingLeft: "30px" }} className="container">
            {" "}
            © 2019 Copyright Owlz
          </div>
          <div className="right">
            <img
              src={process.env.PUBLIC_URL + "/images/secure.png"}
              className="secure"
              alt="secure"
            />
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
