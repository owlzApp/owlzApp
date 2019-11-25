import React from "react";
import "../css/Banner.css";
import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";

class Banner extends React.Component {
  render() {
    return (
      <div className="banner">
        <div className="container center">
          <ScrollAnimation animateIn="slideInRight">
            <h1>Personal all in one consierge</h1>
            <p>
              CONNECT - Connect with a VIP Liaison in the city you are traveling
              to.
            </p>
            <p>BOOK - Create personalized itenerary for a perfect trip</p>
            <p>
              EXPERENCE - Experience the city as an insider (with a point of
              contact overseeing stay)
            </p>
          </ScrollAnimation>
          <ScrollAnimation animateIn="zoomIn">
            <Link to="/form" className="waves-effect waves-light btn">
              LEARN MORE
            </Link>
          </ScrollAnimation>
        </div>
      </div>
    );
  }
}

export default Banner;
