import React from "react";
import "../css/BoxImage.css";
import ScrollAnimation from "react-animate-on-scroll";

class BoxImage extends React.Component {
  render() {
    return (
      <div className="banner-form">
        <div className="text-banner">
          <div className="container">
            <div className="list-form-image">
              <div className="space">
                <i className="material-icons text-left">check</i>
                Connect with a VIP Liaison in the city you are traveling to.
              </div>

              <div className="space">
                <i className="material-icons text-left">check</i>
                Explore what the city has to offer creating the perfect
                itinerary.
              </div>

              <div className="space">
                <i className="material-icons text-left">check</i>
                Experience the city like you never have before with an insider
                guiding you every step of the way
              </div>
            </div>
          </div>
        </div>
        <img
          src={process.env.PUBLIC_URL + "/images/miami-beach.jpg"}
          alt="logo"
        />
      </div>
    );
  }
}

export default BoxImage;
