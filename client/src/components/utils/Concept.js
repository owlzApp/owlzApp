import React from "react";
import "../css/Concept.css";
import { Link } from "react-router-dom";

class Concept extends React.Component {
  render() {
    return (
      <div className="Concept">
        <div className="container">
          <h3 className="center">Concept</h3>
          <p className="center">
            Connect with a VIP Promoter in the city you are traveling to
          </p>
          <div className="row center block-concept">
            <div className="col m4 s12">
              <h5>Connect</h5>
              <p>
                Connect with a VIP Liaison in the city you are traveling to.
              </p>
            </div>
            <div className="col m4 s12">
              <h5>Book</h5>
              <p>
                Explore what the city has to offer creating the perfect
                itinerary.
              </p>
            </div>
            <div className="col m4 s12">
              <h5>Experience</h5>
              <p>
                Experience the city like you never have before with an insider
                guiding you every step of the way
              </p>
            </div>
          </div>
          <div className="center">
            <Link to="/form" className="waves-effect waves-light btn">
              Book now
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Concept;
