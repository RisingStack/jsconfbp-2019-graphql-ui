import React, { useContext, useState, useEffect } from 'react';
import { ApolloProvider as HooksApolloProvider } from '@apollo/react-hooks';
import { ApolloProvider as ComponentsApolloProvider } from '@apollo/react-components';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import client from './apollo';
import Hello from './Components/Hello';
import Singin from './Components/Singin';
import Register from './Components/Register';
import Post from './Components/Post';
import PostForm from './Components/PostForm';
import Posts from './Components/Posts';
import NoMatch from './Components/NoMatch';
import Header from './Components/Header';
import UserContext, { UserProvider } from './Context/UserContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => (
        user
          ? <Component {...props} />
          : <Redirect to="/signin" />
      )}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('jsconfbp:graphql:user')));
  useEffect(() => {
    localStorage.setItem('jsconfbp:graphql:user', JSON.stringify(user));
  }, [user]);

  return (
    <HooksApolloProvider client={client}>
      <ComponentsApolloProvider client={client}>
        <UserProvider value={{ user, setUser }}>
          <BrowserRouter>
            <Header />
            <Switch>
              <ProtectedRoute exact path="/" component={Posts} />
              <ProtectedRoute exact path="/postform" component={PostForm} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/signin" component={Singin} />
              <Route exact path="/hello" component={Hello} />
              <ProtectedRoute exact path="/post/:postId" component={({ match: { params } }) => <Post {...params} />} />
              <Route component={NoMatch} />
            </Switch>
          </BrowserRouter>
        </UserProvider>
      </ComponentsApolloProvider>
    </HooksApolloProvider>
  );
};

export default App;
