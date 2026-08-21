import { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import { LoginModal } from './components/modals/auth/login-modal';
import { RegisterModal } from './components/modals/auth/register-modal';
import { useToggle } from './hooks/useToggle';
import { useAuthState } from './hooks/useAuthState';
import { useLogoutMutation } from './redux/api/auth.api';

export const Home = () => {
  const { toggle: showLoginModal, handleToggle: setShowLoginModal } = useToggle();
  const { toggle: showRegisterModal, handleToggle: setShowRegisterModal } = useToggle();
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
    <>
      {!isAuthenticated ? (
        <>
          <LoginModal showModal={showLoginModal} setShowModal={setShowLoginModal} />
          <RegisterModal showModal={showRegisterModal} setShowModal={setShowRegisterModal} />
          <Button className="btn btn-lg custom-button" onClick={setShowLoginModal}>
            Login
          </Button>
          <p className="fs-2 mt-2">No account yet? Sign up below:</p>
          <Button className="btn btn-lg custom-buton" onClick={setShowRegisterModal}>
            Register
          </Button>
        </>
      ) : (
        <>
          <div>Welcome back!</div>
          <Button className="btn btn-lg custom-button" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </>
  );
};
