import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import logoutMutation from '../mutation/Logout';

class Header extends Component {
  onLogoutClick = () => {
    this.props.mutate({
      refetchQueries: [{ query }],
    });
  };

  renderButtons() {
    const { loading, user } = this.props.data;

    if (loading) return null;

    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick}>Logout</a>
        </li>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Logo
          </Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(logoutMutation)(graphql(query)(Header));
