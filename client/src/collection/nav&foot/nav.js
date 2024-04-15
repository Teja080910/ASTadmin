import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
export const Navbars=()=>
{
  const Pin=()=>
  {
    sessionStorage.yoga=prompt("Enter pin");
  }
    return(
        <>
         <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>AST</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  href="/">Home</Nav.Link>
            <Nav.Link href="/attendance">Attendance</Nav.Link>
            <Nav.Link href="/yoga" onClick={Pin}>Daily Sadhana</Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="/addproject">Add Project</NavDropdown.Item>
              <NavDropdown.Item href="/projects">Projects</NavDropdown.Item>
              <NavDropdown.Item href="/scrummaster">Scrum Masters</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
    )
}