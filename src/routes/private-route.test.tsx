import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PrivateRoute } from './private-route';

const renderPrivateRoute = (isLoggedIn: boolean) => {
  return render(
    <Router>
      <PrivateRoute isLoggedIn={isLoggedIn}>
        <div>Protected Content</div>
      </PrivateRoute>
    </Router>
  );
};

describe('PrivateRoute', () => {
  it('should render children when user is logged in', () => {
    renderPrivateRoute(true);

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should not render children when user is not logged in', () => {
    renderPrivateRoute(false);

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should navigate to home when user is not logged in', async () => {
    renderPrivateRoute(false);

    await vi.waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });
});
