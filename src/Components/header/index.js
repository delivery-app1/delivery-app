import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar,Nav,Container} from 'react-bootstrap/'
function Header() {
  return (
   
    <Navbar bg="dark" variant="dark">
   
    <Navbar.Brand href="/">Caffee House</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/admin">Orders</Nav.Link>
    </Nav>

  </Navbar>


  );
}

export default Header;