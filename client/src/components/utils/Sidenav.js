import React from "react";
import Faq from "../Faq";

class Sidenav extends React.Component {
  render() {
    return (
      <ul id="slide-out" class="sidenav faq">
        <li>
          <h5 className="center">FAQ</h5>
        </li>
        <li>
          <div class="divider"></div>
        </li>
        <li>
          <Faq />
        </li>
        <li>
          <a href="#!">First Link</a>
        </li>
        <li>
          <a href="#!">Second Link</a>
        </li>
      </ul>
    );
  }
}

export default Sidenav;
