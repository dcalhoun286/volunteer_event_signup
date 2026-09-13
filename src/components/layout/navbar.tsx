import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useToggle } from '../../hooks/useToggle';

export const Navbar = () => {
  const { toggle: showNavbar, handleToggle: setShowNavbar } = useToggle();

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
        <Offcanvas.Body>WHERE THE NAV ITEMS BELONG</Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
