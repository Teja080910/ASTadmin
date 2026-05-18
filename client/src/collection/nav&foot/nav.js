import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { Box, IconButton, useColorModeValue } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const navStyles = {
  navbar: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    fontWeight: 700,
    fontSize: '1.25rem',
    background: 'linear-gradient(135deg, #6366f1, #d946ef)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.02em',
  },
  link: {
    fontWeight: 500,
    fontSize: '0.875rem',
    color: '#475569',
    transition: 'color 0.2s',
    borderRadius: '6px',
    padding: '0.5rem 0.75rem',
  },
  dropdownItem: {
    fontWeight: 500,
    fontSize: '0.8125rem',
    color: '#334155',
    padding: '0.5rem 1rem',
    transition: 'all 0.15s',
    borderRadius: '6px',
  },
}

export const Navbars=()=> {
  return (
    <>
      <Navbar expand="lg" style={navStyles.navbar}>
        <Container>
          <Navbar.Brand href="/" style={navStyles.brand}>AST Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <HamburgerIcon />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{ gap: '2px' }}>
              <Nav.Link href="/" style={navStyles.link}
                onMouseEnter={e => { e.target.style.background = '#f1f5f9'; e.target.style.color = '#4f46e5' }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#475569' }}
              >Home</Nav.Link>
              <Nav.Link href="/attendance" style={navStyles.link}
                onMouseEnter={e => { e.target.style.background = '#f1f5f9'; e.target.style.color = '#4f46e5' }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#475569' }}
              >Attendance</Nav.Link>
              <NavDropdown title={<span style={{ fontWeight: 500, fontSize: '0.875rem', color: '#475569' }}>More</span>} id="basic-nav-dropdown" style={{ borderRadius: '6px' }}>
                <div style={{ padding: '4px' }}>
                  <NavDropdown.Item href="/addproject" style={navStyles.dropdownItem}
                    onMouseEnter={e => e.target.style.background = '#f1f5f9'}
                    onMouseLeave={e => e.target.style.background = 'transparent'}
                  >Add Project</NavDropdown.Item>
                  <NavDropdown.Item href="/projects" style={navStyles.dropdownItem}
                    onMouseEnter={e => e.target.style.background = '#f1f5f9'}
                    onMouseLeave={e => e.target.style.background = 'transparent'}
                  >Projects</NavDropdown.Item>
                  <NavDropdown.Item href="/scrummaster" style={navStyles.dropdownItem}
                    onMouseEnter={e => e.target.style.background = '#f1f5f9'}
                    onMouseLeave={e => e.target.style.background = 'transparent'}
                  >Scrum Masters</NavDropdown.Item>
                </div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
