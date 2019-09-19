import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';

import UserContext from '../Context/UserContext';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading] = useState(false);
  const { user } = useContext(UserContext);

  // TODO: TASK 2. handleSingin
  const handleSingin = (event) => {
    event.preventDefault();
    console.log('handleSingin');
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
