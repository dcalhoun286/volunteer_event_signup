import { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Navbar } from './navbar';
import { useAuthState } from '../../hooks/useAuthState';
import { useLogoutMutation } from '../../redux/api/auth.api';

const LOGOUT_BUTTON_STYLE: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
};

export const Header = () => {
  const { isAuthenticated } = useAuthState();
  const [logout] = useLogoutMutation();

  const handleLogout = useCallback(async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error('Logout failed', err);
    }
  }, [logout]);

  return (
    <header>
      <h1 className="display-4">Volunteer Event Signup</h1>
      <p className="lead">
        Here's where you can register to give your time to help for our events,
        all in one place!
      </p>
      {isAuthenticated && (
        <>
          <Container fluid>
            <Row className="justify-content-between">
              <Col xs={2}>
                <Navbar />
              </Col>
              <Col xs={3} style={LOGOUT_BUTTON_STYLE}>
                <Button
                  className="btn btn-lg custom-button"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      )}
      <hr className="my-4" />
    </header>
  );
};
