import React from "react";
import "../css/Review.css";
import M from "materialize-css/dist/js/materialize.min.js";

class Review extends React.Component {
  componentDidMount() {
    // SideBar
    var elems = document.querySelectorAll(".carousel");
    M.Carousel.init(elems, { padding: 40 });
  }
  render() {
    return (
      <div className="Review">
        <div className="container center">
          <div className="row">
            <h3>Reviews</h3>
            <hr></hr>
          </div>
          <div className="carousel">
            <div className="carousel-item">
              <p>Bob Smith</p>
              <p>
                <i className="fas fa-quote-left"></i> Great Web site! The
                chaiman of this compagny is visionary{" "}
                <i className="fas fa-quote-right"></i>
              </p>
              <p>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </p>
            </div>
            <div className="carousel-item">
              <p>Steve Jobs</p>
              <p>
                <i className="fas fa-quote-left"></i> Great Web site! The
                chaiman of this compagny is visionary{" "}
                <i className="fas fa-quote-right"></i>
              </p>
              <p>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </p>
            </div>{" "}
            <div className="carousel-item">
              <p>Steve McQueen</p>
              <p>
                <i className="fas fa-quote-left"></i> Great Web site! The
                chaiman of this compagny is visionary{" "}
                <i className="fas fa-quote-right"></i>
              </p>
              <p>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </p>
            </div>{" "}
            <div className="carousel-item">
              <p>Funnanya the Great</p>
              <p>
                <i className="fas fa-quote-left"></i> Great Web site! The
                chaiman of this compagny is visionary{" "}
                <i className="fas fa-quote-right"></i>
              </p>
              <p>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
