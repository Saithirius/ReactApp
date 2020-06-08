import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const withAuthRedirectComponent = (Component) => {
  class componentConnect extends React.Component {
    render() {
      if (!this.props.isAuth) { return <Redirect to='/Login' /> };
      return <Component {...this.props}/>;
    }
  }

  const mapStateToProps = (state) => {
    return {
      isAuth: state.login.isAuth,
    };
  };

  return connect(mapStateToProps, {})(componentConnect);
}