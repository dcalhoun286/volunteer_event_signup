interface MainProps {
    children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
    return (
        <main className="min-vh-100">
            {children}
        </main>
    );
};
