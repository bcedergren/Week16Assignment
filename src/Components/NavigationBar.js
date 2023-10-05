import React from "react";
import { Navbar, Nav, NavItem, Container } from "react-bootstrap";

function NavigationBar() {
  return (
    <Navbar collapseOnSelect expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand href='/'>Recipe Book</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/recipes'>Recipes</Nav.Link>
            <Nav.Link href='/add'>AddRecipe</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
