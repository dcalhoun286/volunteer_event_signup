import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Link, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useToggle } from '../../hooks/useToggle';

export const Navbar = () => {
  const { toggle: showNavbar, handleToggle: setShowNavbar } = useToggle();
  const location = useLocation();

  return (
    <>
      <Button
        data-testid="navbar-button"
        variant="outline-light"
        onClick={setShowNavbar}
      >
        <Image src="./app/assets/images/list.svg" />
      </Button>
      <Offcanvas show={showNavbar} onHide={setShowNavbar}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Nav Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <hr className="my-4" />
        <Offcanvas.Body>
          <Nav variant="pills" defaultActiveKey="/" className="flex-column">
            <Nav.Link
              as={Link}
              to="/"
              onClick={setShowNavbar}
              active={location.pathname === '/'}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/events"
              onClick={setShowNavbar}
              active={location.pathname === '/events'}
            >
              Events
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
