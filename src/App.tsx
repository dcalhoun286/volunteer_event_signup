import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RoutesComponent from './routes/index';
import { useGetCurrentUserQuery } from './redux/api/auth.api';
import { setAuthenticated } from './redux/slices/auth.slice';

const App = () => {
  const { data } = useGetCurrentUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.success) {
      // user is authenticated, update Redux state
      dispatch(setAuthenticated(true));
    }
  }, [data, dispatch]);

  return <RoutesComponent />;
};

export default App;
