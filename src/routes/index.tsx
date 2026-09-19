import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Outlet,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Events } from '../components/events/events';
import { Home } from '../Home';
import { Header } from '../components/layout/header';
import { Main } from '../components/layout/main';
import { Footer } from '../components/layout/footer';
import { PrivateRoute } from './private-route';
import { useAuthState } from '../hooks/useAuthState';
import { useGetCurrentUserQuery } from '../redux/api/auth.api';
import { setAuthenticated } from '../redux/slices/auth.slice';

const RoutesComponent = () => {
  const { isAuthenticated } = useAuthState();
  const { data, isLoading, error } = useGetCurrentUserQuery();
  const dispatch = useDispatch();
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) {
      if (data?.success) {
        dispatch(setAuthenticated(true));
      }
      setAuthInitialized(true);
    }
  }, [isLoading, data, error, dispatch]);

  if (!authInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="vw-100 vh-100 primary-color d-flex justify-content-center">
        <div className="vw-100 vh-100 container secondary-color">
          <Routes>
            <Route
              element={
                <>
                  <Header />
                  <Main>
                    <Outlet />
                  </Main>
                  <Footer />
                </>
              }
            >
              <Route path="/" element={<Home />} />
              <Route
                path="/events"
                element={
                  <PrivateRoute isLoggedIn={isAuthenticated}>
                    <Events />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default RoutesComponent;
