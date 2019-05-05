import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import query from '../queries/CurrentUser';
import signupMutation from '../mutation/Signup';

import AuthForm from './AuthForm';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user && this.props.data.user) {
      this.props.history.push('/dashboard');
    }
  }

  onSubmit = ({ email, password }) => {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }],
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(err => err.message);
        this.setState({ errors });
      });
  };
  render() {
    return (
      <div>
        <h5>Sign Up</h5>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default graphql(query)(graphql(signupMutation)(SignupForm));
