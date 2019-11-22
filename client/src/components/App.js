import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import * as actions from "./actions";
import { connect } from "react-redux";
import "./css/App.css";
import "animate.css/animate.min.css";

import Welcome from "./Welcome";
import Signout from "./auth/Signout";
import Signin from "./auth/Signin";
import UserShow from "./user/UserShow";
import UserEdit from "./user/UserEdit";
import Signup from "./auth/Signup";
import WizardForm from "./form/WizardForm";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" component={Welcome} />
          <Route path="/signout" component={Signout} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/form" component={WizardForm} />

          {this.props.authenticated ? (
            <div>
              <Route exact path="/user/:id" component={UserShow} />
              <Route exact path="/user/edit/:id" component={UserEdit} />
            </div>
          ) : (
            ""
          )}
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToPros, actions)(App);
