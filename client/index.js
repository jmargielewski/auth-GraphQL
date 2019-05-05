import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { Route, HashRouter } from 'react-router-dom';

// components
import App from './components/App';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import requireAuth from './components/requireAuth';

const link = createHttpLink({
  uri: 'http://api.githunt.com/graphql',
  // include: 'same-origin',
});

const client = new ApolloClient({
  link,
  dataIdFromObject: o => o.id,
});

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <div className="container">
        <Header />
        <Component {...props} />
      </div>
    )}
  />
);

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <AppRoute exact path="/" component={App} />
        <AppRoute path="/login" component={LoginForm} />
        <AppRoute path="/signup" component={SignupForm} />
        <AppRoute path="/dashboard" component={requireAuth(Dashboard)} />
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#app'));
