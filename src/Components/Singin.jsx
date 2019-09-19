import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';
import { Button, Form, Container } from 'react-bootstrap';

import UserContext from '../Context/UserContext';
import queries from '../query';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const apolloClient = useApolloClient();

  const handleSingin = (event) => {
    event.preventDefault();
    if (email && password && !isLoading) {
      setIsLoading(true);
      apolloClient.query({
        query: queries.user.SIGNIN_QUERY,
        variables: { email, password },
      }).then(({ data: { signin } }) => {
        setUser(signin);
      }).catch(() => {
        alert('Wrong email/password');
        setIsLoading(false);
      });
    }
  };

  if (user) return <Redirect to="/" />;
  return (
    <Container className="singin">
      <h2>Sign in</h2>
      <Form onSubmit={handleSingin}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!email || !password || isLoading}
        >
          {isLoading ? 'Loading…' : 'Submit'}
        </Button>
      </Form>
      <div>
        {"Don't have an account? "}
        <Link to="/register">Register</Link>
      </div>
    </Container>
  );
};

export default Signin;
