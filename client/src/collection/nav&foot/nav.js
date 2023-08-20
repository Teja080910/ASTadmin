import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
export const Navbars=()=>
{
    return(
        <>
         <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>AST</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/adminlogin">Admin</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">Attendance</NavDropdown.Item>
              <NavDropdown.Item href="/addproject">Add Project</NavDropdown.Item>
              <NavDropdown.Item href="/projects">Projects</NavDropdown.Item>
              <NavDropdown.Item href="#">Daily Attendance</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        {/* <div className="display">
        <h1>MERN</h1>
        <h1 className="center">ATTENDANCE</h1>
        </div>
        <div className="display1">
            <Link to='/addproject' className="display1item">Add Project</Link>
            <Link to='/projects' className="display1item" style={{marginRight:'11%'}}>Projects</Link>
        </div>
        <br/> */}
        </>
    )
}