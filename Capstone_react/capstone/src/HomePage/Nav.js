import React from 'react';
import { Nav, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Importing useSelector
import { fetchDataAction, setFilterByYear, setFilterByCrop } from '../Redux/actions'; // Importing action creators

const NavBar = () => {
  const dispatch = useDispatch(); // Get the dispatch function from react-redux

  const handleHomeClick = () => {
    // Dispatch actions to clear Redux state
    dispatch(fetchDataAction([])); // Clear data
    dispatch(setFilterByYear('')); // Clear label
    dispatch(setFilterByCrop('')); // Clear filterByCrop
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand >Indian Agriculture Crop data</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link as={Link} to="/" onClick={handleHomeClick}>
            Home
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
