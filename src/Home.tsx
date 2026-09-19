import Button from 'react-bootstrap/Button';
import { LoginModal } from './components/modals/auth/login-modal';
import { RegisterModal } from './components/modals/auth/register-modal';
import { useToggle } from './hooks/useToggle';
import { useAuthState } from './hooks/useAuthState';

export const Home = () => {
  const { toggle: showLoginModal, handleToggle: setShowLoginModal } =
    useToggle();
  const { toggle: showRegisterModal, handleToggle: setShowRegisterModal } =
    useToggle();
  const { isAuthenticated } = useAuthState();

  return (
    <>
      {!isAuthenticated ? (
        <>
          <LoginModal
            showModal={showLoginModal}
            setShowModal={setShowLoginModal}
          />
          <RegisterModal
            showModal={showRegisterModal}
            setShowModal={setShowRegisterModal}
          />
          <Button
            className="btn btn-lg custom-button"
            onClick={setShowLoginModal}
          >
            Login
          </Button>
          <p className="fs-2 mt-2">No account yet? Sign up below:</p>
          <Button
            className="btn btn-lg custom-buton"
            onClick={setShowRegisterModal}
          >
            Register
          </Button>
        </>
      ) : (
        <>
          <div>Welcome back!</div>
        </>
      )}
    </>
  );
};
