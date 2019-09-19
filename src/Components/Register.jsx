import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';
import { Button, Form, Container } from 'react-bootstrap';

import UserContext from '../Context/UserContext';
import queries from '../query';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const apolloClient = useApolloClient();
  const passwordVerified = password === passwordVerify;

  const handleRegister = (event) => {
    event.preventDefault();
    if (name && username && email && password && passwordVerified && !isLoading) {
      setIsLoading(true);
      apolloClient.mutate({
        mutation: queries.user.CREATE_USER_MUTATION,
        variables: {
          email, password, name, username,
        },
      }).then(({ data: { user: { createUser: createUserResp } } }) => {
        setUser(createUserResp);
        setIsLoading(false);
      }).catch(() => {
        alert('Something went wrong...');
        setIsLoading(false);
      });
    }
  };

  if (user) return <Redirect to="/" />;
  return (
    <Container className="register">
      <h2>Register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            maxLength={30}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            maxLength={30}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            maxLength={30}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            maxLength={30}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPasswordVerify">
          <Form.Label>Password Verify</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password Verify"
            value={passwordVerify}
            isInvalid={passwordVerify && !passwordVerified}
            isValid={passwordVerify && passwordVerified}
            onChange={(event) => setPasswordVerify(event.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!name || !username || !email || !password || !passwordVerified || isLoading}
        >
          {isLoading ? 'Loading…' : 'Submit'}
        </Button>
      </Form>
      <div>
        {'Already have an account? '}
        <Link to="/signin">Sing in</Link>
      </div>
    </Container>
  );
};

export default Register;
