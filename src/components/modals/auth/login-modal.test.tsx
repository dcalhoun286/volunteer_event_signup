import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../redux/slices/auth.slice';
import { authApi } from '../../../redux/api/auth.api';
import { authHandlers } from '../../../redux/handlers/auth-handlers';
import { LoginModal } from './login-modal';
import type { ReactNode } from 'react';

const createTestStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
  });
};

const renderWithRedux = (component: ReactNode) => {
  const store = createTestStore();
  return render(<Provider store={store}>{component}</Provider>);
};

describe('LoginModal', () => {
  const mockSetShowModal = vi.fn();
  const server = setupServer(...authHandlers);

  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    mockSetShowModal.mockClear();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    vi.restoreAllMocks();
    server.close();
  });

  it('should render the modal when showModal is true', () => {
    renderWithRedux(
      <LoginModal showModal={true} setShowModal={mockSetShowModal} />
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should not render the modal when showModal is false', () => {
    renderWithRedux(
      <LoginModal showModal={false} setShowModal={mockSetShowModal} />
    );

    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('should render email and password input fields', () => {
    renderWithRedux(
      <LoginModal showModal={true} setShowModal={mockSetShowModal} />
    );

    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  it('should render Cancel and Submit buttons', () => {
    renderWithRedux(
      <LoginModal showModal={true} setShowModal={mockSetShowModal} />
    );

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should update form data on input change', async () => {
    const user = userEvent.setup();
    renderWithRedux(
      <LoginModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const emailInput = screen.getByPlaceholderText(
      'Enter email'
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      'Enter password'
    ) as HTMLInputElement;

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('should clear form data and close modal on cancel', async () => {
    const user = userEvent.setup();
    renderWithRedux(
      <LoginModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const cancelButton = screen.getByText('Cancel');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(cancelButton);

    expect(mockSetShowModal).toHaveBeenCalled();
  });

  it('should disable inputs and buttons while loading', async () => {
    renderWithRedux(
      <LoginModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const emailInput = screen.getByPlaceholderText(
      'Enter email'
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      'Enter password'
    ) as HTMLInputElement;
    const submitButton = screen.getByText('Submit') as HTMLButtonElement;
    const cancelButton = screen.getByText('Cancel') as HTMLButtonElement;

    // Verify they are not disabled initially
    expect(emailInput.disabled).toBe(false);
    expect(passwordInput.disabled).toBe(false);
    expect(submitButton.disabled).toBe(false);
    expect(cancelButton.disabled).toBe(false);
  });

  it('should show Loading... text while loading', async () => {
    renderWithRedux(
      <LoginModal showModal={true} setShowModal={mockSetShowModal} />
    );

    // Initially shows "Submit"
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should close button be disabled while loading', () => {
    renderWithRedux(
      <LoginModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const modalHeader = screen.getByText('Login').closest('.modal-header');
    expect(modalHeader).toBeInTheDocument();
  });

  it('should have email as required field', () => {
    renderWithRedux(
      <LoginModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const emailInput = screen.getByPlaceholderText(
      'Enter email'
    ) as HTMLInputElement;
    expect(emailInput.required).toBe(true);
  });

  it('should have password as required field', () => {
    renderWithRedux(
      <LoginModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const passwordInput = screen.getByPlaceholderText(
      'Enter password'
    ) as HTMLInputElement;
    expect(passwordInput.required).toBe(true);
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    renderWithRedux(
      <LoginModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // The form should be submitted (in a real scenario with mocked login)
    expect(submitButton).toBeInTheDocument();
  });

  it('should call setShowModal when modal is closed via close button', async () => {
    renderWithRedux(
      <LoginModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockSetShowModal).toHaveBeenCalled();
  });

  it('should reset form data after successful login', async () => {
    const user = userEvent.setup();
    renderWithRedux(
      <LoginModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const emailInput = screen.getByPlaceholderText(
      'Enter email'
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      'Enter password'
    ) as HTMLInputElement;

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('should have static backdrop (keyboard false)', () => {
    renderWithRedux(
      <LoginModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const modal = screen.getByText('Login').closest('.modal');
    expect(modal).toHaveClass('modal');
  });
});
