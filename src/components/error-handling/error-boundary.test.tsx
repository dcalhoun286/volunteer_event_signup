import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './error-boundary';

const ThrowError = (): never => {
  throw new Error('Test error message');
};

const NormalComponent = () => <div>Normal content</div>;

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();
  });

  it('should display error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const homeButton = screen.getByRole('button', { name: 'Go to Home' });
    expect(homeButton).toBeInTheDocument();
  });

  it('should display Try Again button', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const retryButton = screen.getByRole('button', { name: 'Try Again' });
    expect(retryButton).toBeInTheDocument();
  });

  it('should call componentDidCatch when error is caught', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();

    const calls = consoleErrorSpy.mock.calls;
    const hasComponentDidCatchCall = calls.some(
      (call) => call[0] === 'Error caught by boundary:'
    );
    expect(hasComponentDidCatchCall).toBe(true);
  });

  it('should reset error state when Try Again button is clicked', async () => {
    const user = userEvent.setup();
    let shouldThrow = true;

    const TestComponent = () => {
      if (shouldThrow) {
        throw new Error('Test error message');
      }
      return <div>Content loaded</div>;
    };

    const { rerender } = render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Change the flag so component won't throw
    shouldThrow = false;

    const retryButton = screen.getByRole('button', { name: /try again/i });
    await user.click(retryButton);

    rerender(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Content loaded')).toBeInTheDocument();
  });

  it('should have a clickable Go to Home button', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const homeButton = screen.getByRole('button', { name: 'Go to Home' });
    expect(homeButton).not.toBeDisabled();
    await user.click(homeButton);
  });
});
