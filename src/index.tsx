import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/error-handling/error-boundary';
import App from './App';
import { store } from './redux/store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
);
