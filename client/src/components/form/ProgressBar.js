import React from "react";
import "../css/ProgressBar.css";

const ProgressBar = props => {
  const { progress, progress2, progress3 } = props;
  return (
    <div className="progressbar">
      <div className={`item ${progress}`}>
        <p>
          <i className="far fa-address-card"></i>
        </p>
      </div>
      <div className={`item ${progress2}`}>
        <p>
          <i className="fas fa-running"></i>
        </p>
      </div>
      <div className={`item ${progress3}`}>
        <p>
          <i className="fas fa-comment-dots"></i>
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
