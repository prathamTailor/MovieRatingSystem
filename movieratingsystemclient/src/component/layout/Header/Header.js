import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useSelector} from "react-redux"

const header = (props) => {

  return (
    <>
        <Navbar bg="dark" expand="lg" variant='dark' fixed="top">
            <Container fluid>
                <Navbar.Brand href="#">Movie Rating System</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/Movies">Movies</Nav.Link>
                        <Nav.Link href="/Celebrities">Celebrities</Nav.Link>
                        <Nav.Link href="/Roles">Roles</Nav.Link>
                        {props.isAuthenticated ?
                        (<Nav.Link href="/Profile">Profile</Nav.Link>) :
                        (<Nav.Link href="/LoginSignUp">Login/SignUp</Nav.Link>) }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}

export default header