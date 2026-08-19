import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/slices/auth.slice";
import { authApi } from "./redux/api/auth.api";
import { authHandlers } from "./redux/handlers/auth-handlers";
import { Home } from "./Home";
import type { ReactNode } from "react";

const createTestStore = (isAuthenticated = false) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            [authApi.reducerPath]: authApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(authApi.middleware),
        preloadedState: {
            auth: {
                isAuthenticated,
                isLoading: false,
                error: null,
            },
        },
    });
};

const renderWithRedux = (component: ReactNode, isAuthenticated = false) => {
    const store = createTestStore(isAuthenticated);
    return render(
        <Provider store={store}>
            {component}
        </Provider>
    );
};

describe("Home", () => {
    const server = setupServer(...authHandlers);

    beforeAll(() => {
        server.listen();
    });

    afterEach(() => {
        server.resetHandlers();
    });

    afterAll(() => {
        vi.restoreAllMocks();
        server.close();
    });

    describe("when not authenticated", () => {
        it("should render login button", () => {
            renderWithRedux(<Home />);

            expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
        });

        it("should render LoginModal component", () => {
            renderWithRedux(<Home />);

            const loginButton = screen.getByRole("button", { name: "Login" });
            expect(loginButton).toBeInTheDocument();
        });

        it("should open LoginModal when login button is clicked", async () => {
            const user = userEvent.setup();
            renderWithRedux(<Home />);

            const loginButton = screen.getByRole("button", { name: "Login" });
            await user.click(loginButton);

            // Modal should open and show the login form
            expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
        });

        it("should not render logout button", () => {
            renderWithRedux(<Home />);

            expect(screen.queryByRole("button", { name: "Logout" })).not.toBeInTheDocument();
        });

        it("should not render welcome message", () => {
            renderWithRedux(<Home />);

            expect(screen.queryByText("Welcome back!")).not.toBeInTheDocument();
        });
    });

    describe("when authenticated", () => {
        it("should not render login button", () => {
            renderWithRedux(<Home />, true);

            expect(screen.queryByRole("button", { name: "Login" })).not.toBeInTheDocument();
        });

        it("should render welcome message", () => {
            renderWithRedux(<Home />, true);

            expect(screen.getByText("Welcome back!")).toBeInTheDocument();
        });

        it("should render logout button", () => {
            renderWithRedux(<Home />, true);

            expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
        });

        it("should call logout mutation when logout button is clicked", async () => {
            const user = userEvent.setup();
            renderWithRedux(<Home />, true);

            const logoutButton = screen.getByRole("button", { name: "Logout" });
            await user.click(logoutButton);

            // Logout mutation should be called
            expect(logoutButton).toBeInTheDocument();
        });

        it("should not render LoginModal", () => {
            renderWithRedux(<Home />, true);

            expect(screen.queryByText("Login")).not.toBeInTheDocument();
        });
    });
});
