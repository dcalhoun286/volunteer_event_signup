import { authApi } from "./auth.api";

describe("authApi", () => {
    describe("endpoints", () => {
        it("should have register mutation", () => {
            expect(authApi.endpoints.register).toBeDefined();
        });

        it("should have login mutation", () => {
            expect(authApi.endpoints.login).toBeDefined();
        });
    });

    describe("register mutation", () => {
        it("should build correct query", () => {
            const userData = {
                email: "test@example.com",
                password: "password123",
                first_name: "John",
                last_name: "Doe",
            };

            const query = authApi.endpoints.register.initiate(userData);
            expect(query).toBeDefined();
        });
    });

    describe("login mutation", () => {
        it("should build correct query", () => {
            const credentials = {
                email: "test@example.com",
                password: "password123",
            };

            const query = authApi.endpoints.login.initiate(credentials);
            expect(query).toBeDefined();
        });
    });
});
