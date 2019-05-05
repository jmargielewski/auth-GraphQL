import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

export default WrappedComponent => {
  class RequireAuth extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.data.loading && !this.props.data.user) {
        this.props.history.push('/');
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return graphql(query)(RequireAuth);
};
