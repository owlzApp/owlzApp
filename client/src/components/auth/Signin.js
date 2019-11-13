import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";

class Signin extends React.Component {
  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push(`/`);
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h4 className="center">
            Sign in <i className="fas fa-user-alt"></i>
          </h4>

          <div className="input-field">
            <div style={{ color: "red", marginLeft: "45px" }}>
              {this.props.errorMessage}
            </div>
            <i className="material-icons prefix">email</i>
            <Field
              name="email"
              type="text"
              component="input"
              autoComplete="none"
              placeholder="email"
            />
          </div>

          <div className="input-field">
            <i className="material-icons prefix">lock</i>
            <Field
              name="password"
              type="password"
              component="input"
              autoComplete="none"
              placeholder="password"
            />
          </div>
          <button className="waves-effect waves-light btn">
            <i className="material-icons right">cloud</i>Sign In
          </button>
        </form>
        <ul>
          <li style={{ listStyle: "none", paddingBottom: "10px" }}>
            <a
              href="/auth/google"
              className="waves-effect waves-light btn social google"
            >
              <i className="fab fa-google"></i> Sign in with google
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    errorMessage: state.auth.errorMessage,
    auth: state.auth,
    authReducer: state.authReducer
  };
}

export default compose(
  connect(mapStateToPros, actions),
  reduxForm({ form: "signin" })
)(Signin);
