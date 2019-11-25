import React from "react";
import "../css/Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="">Footer Content</h5>
              <p className="text-lighten-4">
                You can use rows and columns here to organize your footer
                content.
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
          <div className="container">© 2019 Copyright Owlz</div>
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
