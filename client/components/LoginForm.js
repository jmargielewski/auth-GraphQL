import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import loginMutation from '../mutation/Login';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
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
        <h5>Login</h5>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default graphql(query)(graphql(loginMutation)(LoginForm));
