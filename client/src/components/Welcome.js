import React from 'react';
import { connect } from 'react-redux';

class Welcome extends React.Component {
  render() {
    return <div></div>;
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}
export default connect(mapStateToProps)(Welcome);
