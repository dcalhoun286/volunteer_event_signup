import { useCallback } from "react";
import Button from "react-bootstrap/Button";
import { LoginModal } from "./components/modals/auth/login-modal";
import { useToggle } from "./hooks/useToggle";
import { useAuthState } from "./hooks/useAuthState";
import { useLogoutMutation } from "./redux/api/auth.api";

export const Home = () => {
  const { toggle: showModal, handleToggle: setShowModal } = useToggle();
  const { isAuthenticated } = useAuthState();
  const [ logout ] = useLogoutMutation();

  const handleLogout = useCallback(async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error("Logout failed", err);
    }
  }, [logout]);

  return (
    <>
      {!isAuthenticated ? (
        <>
          <LoginModal showModal={showModal} setShowModal={setShowModal} />
          <Button
            className="btn btn-lg custom-button"
            onClick={setShowModal}
          >
            Login
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
