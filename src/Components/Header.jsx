import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import UserContext from '../Context/UserContext';

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Link to="/">Posts</Link>
        <Link to="/postform">Create Post</Link>
        <Link to="/hello">Hello</Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {user ? `Logged in as: ${user.username}` : 'You are not logged in'}
        </Navbar.Text>
        {user && <Button variant="outline-info" onClick={() => setUser(null)}>Logout</Button>}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
