import React from "react";
import "../css/Banner.css";
import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";

class Banner extends React.Component {
  render() {
    return (
      <div className="banner">
        <div className="container">
          <ScrollAnimation animateIn="slideInRight">
            <h1>Live the Owlz Adventure</h1>
            <p>Book and reserve your experiencies</p>
          </ScrollAnimation>
          <ScrollAnimation animateIn="zoomIn">
            <Link to="/form" className="waves-effect waves-light btn">
              Book now
            </Link>
          </ScrollAnimation>
        </div>
      </div>
    );
  }
}

export default Banner;
