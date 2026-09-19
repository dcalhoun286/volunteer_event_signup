import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  isLoggedIn: boolean;
  children: ReactNode;
}

export const PrivateRoute = ({ isLoggedIn, children }: PrivateRouteProps) => {
  return isLoggedIn ? children : <Navigate to="/" replace />;
};
