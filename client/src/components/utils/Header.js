import React from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link } from "react-router-dom";
import "../css/Header.css";

class Header extends React.Component {
  componentDidMount() {
    // SideBar
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              <img
                src={process.env.PUBLIC_URL + "/images/logo.png"}
                className="logo"
                alt="logo"
              />
            </Link>
            <a href="/" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/form">Book Now</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to="/form">
              <i className="fas fa-file-signature"></i> Book Now
            </Link>
          </li>
          <li>
            <Link to="/about">
              <i className="far fa-building"></i> About Us
            </Link>
          </li>
          <li>
            <Link to="/faq">
              <i className="far fa-question-circle"></i> FAQ
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToPros)(Header);
