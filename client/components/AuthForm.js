import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <div className="row">
        <form onSubmit={this.onSubmit} className="col s4">
          <div className="input-field">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <div style={{ color: 'red' }}>
            {this.props.errors.map(error => (
              <div key={error}>{error}</div>
            ))}
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}
