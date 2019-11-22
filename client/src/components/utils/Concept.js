import React from "react";
import "../css/Concept.css";
import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";

class Concept extends React.Component {
  render() {
    return (
      <div className="Concept">
        <div className="container">
          <ScrollAnimation animateIn="slideInUp">
            <h3 className="center">Concept</h3>
            <hr></hr>
            <p className="center">
              Connect with a VIP Promoter in the city you are traveling to
            </p>
          </ScrollAnimation>
          <div className="row center block-concept">
            <div className="col m4 s12">
              <ScrollAnimation animateIn="slideInRight" delay={600}>
                <div className="circle-icon">
                  <i className="fas fa-hands-helping"></i>
                </div>
                <h5>Connect</h5>
                <p>
                  Connect with a VIP Liaison in the city you are traveling to.
                </p>
              </ScrollAnimation>
            </div>
            <div className="col m4 s12">
              <ScrollAnimation animateIn="slideInDown" delay={600}>
                <div className="circle-icon">
                  <i className="fas fa-file-signature"></i>
                </div>
                <h5>Book</h5>
                <p>
                  Explore what the city has to offer creating the perfect
                  itinerary.
                </p>
              </ScrollAnimation>
            </div>
            <div className="col m4 s12">
              <ScrollAnimation animateIn="slideInLeft" delay={600}>
                <div className="circle-icon">
                  <i className="fas fa-thumbs-up"></i>
                </div>
                <h5>Experience</h5>
                <p>
                  Experience the city like you never have before with an insider
                  guiding you every step of the way
                </p>
              </ScrollAnimation>
            </div>
          </div>
          <ScrollAnimation animateIn="slideInUp" delay={1200}>
            <div className="center">
              <Link to="/form" className="waves-effect waves-light btn">
                Book now
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    );
  }
}

export default Concept;
