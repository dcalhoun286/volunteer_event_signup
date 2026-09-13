import { Navbar } from './navbar';
import { useAuthState } from '../../hooks/useAuthState';

export const Header = () => {
  const { isAuthenticated } = useAuthState();

  return (
    <header>
      <h1 className="display-4">Volunteer Event Signup</h1>
      <p className="lead">
        Here's where you can register to give your time to help for our events,
        all in one place!
      </p>
      {isAuthenticated && <Navbar />}
      <hr className="my-4" />
    </header>
  );
};
