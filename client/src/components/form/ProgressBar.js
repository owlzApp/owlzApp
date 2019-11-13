import React, { Component } from "react";
import "../css/ProgressBar.css";

const ProgressBar = props => {
  const { progress, progress2, progress3 } = props;
  return (
    <div className="progressbar">
      <div className="item" style={{ backgroundColor: progress }}>
        <p>1</p>
      </div>
      <div className="item" style={{ backgroundColor: progress2 }}>
        <p>2</p>
      </div>
      <div className="item" style={{ backgroundColor: progress3 }}>
        <p>3</p>
      </div>
    </div>
  );
};

export default ProgressBar;
