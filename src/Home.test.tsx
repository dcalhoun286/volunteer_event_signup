import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "./Home";

describe("Home", () => {
    test("loads and displays Home page", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const linkButton = screen.getByRole("link", { name: "Login" });
        expect(linkButton).toHaveAttribute("href", "/login");
    });
});
