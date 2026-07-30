import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Login } from "./login";

describe("Login", () => {
    test("loads and displays Login page", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: "LOGIN PAGE" })).toBeInTheDocument();
        const linkButton = screen.getByRole("link", { name: "Back to home" });
        expect(linkButton).toHaveAttribute("href", "/");
    });
});
