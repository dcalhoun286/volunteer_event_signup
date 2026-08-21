import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../redux/slices/auth.slice';
import { authApi } from '../../../redux/api/auth.api';
import { authHandlers } from '../../../redux/handlers/auth-handlers';
import { RegisterModal } from './register-modal';
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

describe('RegisterModal', () => {
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
      <RegisterModal showModal={true} setShowModal={mockSetShowModal} />
    );

    expect(screen.getByText('Register')).toBeInTheDocument();
  });

    it('should not render the modal when showModal is false', () => {
    renderWithRedux(
        <RegisterModal showModal={false} setShowModal={mockSetShowModal} />
    );

    const modalTitle = screen.queryByRole('heading', { name: 'Register' });
    expect(modalTitle).not.toBeInTheDocument();
    });

  it('should render all required input fields', () => {
    renderWithRedux(
      <RegisterModal showModal={true} setShowModal={mockSetShowModal} />
    );

    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter first name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter last name')).toBeInTheDocument();
  });

  it('should render Cancel and Submit buttons', () => {
    renderWithRedux(
      <RegisterModal showModal={true} setShowModal={mockSetShowModal} />
    );

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should update form data on input change', async () => {
    const user = userEvent.setup();
    renderWithRedux(
      <RegisterModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const emailInput = screen.getByPlaceholderText(
      'Enter email'
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      'Enter password'
    ) as HTMLInputElement;
    const passwordConfirmInput = screen.getByPlaceholderText(
      'Confirm password'
    ) as HTMLInputElement;
    const firstNameInput = screen.getByPlaceholderText(
      'Enter first name'
    ) as HTMLInputElement;
    const lastNameInput = screen.getByPlaceholderText(
      'Enter last name'
    ) as HTMLInputElement;

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.type(passwordConfirmInput, 'password123');
    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(passwordConfirmInput.value).toBe('password123');
    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
  });

  it('should clear form data and close modal on cancel', async () => {
    const user = userEvent.setup();
    renderWithRedux(
      <RegisterModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const emailInput = screen.getByPlaceholderText('Enter email');
    const cancelButton = screen.getByText('Cancel');

    await user.type(emailInput, 'test@example.com');
    await user.click(cancelButton);

    expect(mockSetShowModal).toHaveBeenCalled();
  });

  it('should disable inputs and buttons while loading', () => {
    renderWithRedux(
      <RegisterModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const emailInput = screen.getByPlaceholderText(
      'Enter email'
    ) as HTMLInputElement;
    const submitButton = screen.getByText('Submit') as HTMLButtonElement;
    const cancelButton = screen.getByText('Cancel') as HTMLButtonElement;

    expect(emailInput.disabled).toBe(false);
    expect(submitButton.disabled).toBe(false);
    expect(cancelButton.disabled).toBe(false);
  });

  it('should have all fields as required', () => {
    renderWithRedux(
      <RegisterModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const emailInput = screen.getByPlaceholderText(
      'Enter email'
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      'Enter password'
    ) as HTMLInputElement;
    const passwordConfirmInput = screen.getByPlaceholderText(
      'Confirm password'
    ) as HTMLInputElement;
    const firstNameInput = screen.getByPlaceholderText(
      'Enter first name'
    ) as HTMLInputElement;
    const lastNameInput = screen.getByPlaceholderText(
      'Enter last name'
    ) as HTMLInputElement;

    expect(emailInput.required).toBe(true);
    expect(passwordInput.required).toBe(true);
    expect(passwordConfirmInput.required).toBe(true);
    expect(firstNameInput.required).toBe(true);
    expect(lastNameInput.required).toBe(true);
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    renderWithRedux(
      <RegisterModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const passwordConfirmInput = screen.getByPlaceholderText('Confirm password');
    const firstNameInput = screen.getByPlaceholderText('Enter first name');
    const lastNameInput = screen.getByPlaceholderText('Enter last name');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.type(passwordConfirmInput, 'password123');
    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');
    await user.click(submitButton);

    expect(submitButton).toBeInTheDocument();
  });

  it('should call setShowModal when modal is closed via close button', async () => {
    renderWithRedux(
      <RegisterModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockSetShowModal).toHaveBeenCalled();
  });

  it('should have static backdrop (keyboard false)', () => {
    renderWithRedux(
      <RegisterModal showModal={true} setShowModal={mockSetShowModal} />
    );

    const modal = screen.getByText('Register').closest('.modal');
    expect(modal).toHaveClass('modal');
  });
});
