import { render, screen } from "@testing-library/react";
import { Header } from "./header";

describe("Header", () => {
    test("loads and displays header content", () => {
        render(<Header />);

        expect(screen.getByRole("heading", { name: "Volunteer Event Signup" })).toBeInTheDocument();
        expect(screen.getByText("Here's where you can register to give your time to help for our events, all in one place!")).toBeInTheDocument();
    });
});
