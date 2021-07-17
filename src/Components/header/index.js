import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar,Nav,Container} from 'react-bootstrap/';
import Image from 'react-bootstrap/Image'
function Header() {
  return (
   
    <Navbar style={{ height:"70px" , padding:"20px"}} bg="dark" variant="dark">
      <Image style={{height:"45px" , width:"60px" , paddingRight:"15px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDAQWt71aEu_ID6Es20VILWMhBRiNF88ITKg&usqp=CAU" rounded />
    
    <Navbar.Brand href="/"> Coffee House</Navbar.Brand>

    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/admin">Orders</Nav.Link>
    </Nav>

  </Navbar>


  );
}

export default Header;