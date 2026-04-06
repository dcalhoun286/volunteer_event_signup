import { Link } from "react-router-dom";

export const Login = () => {
    return (
        <>
            <h1>LOGIN PAGE</h1>
            <Link
                to="/"
                className="btn btn-lg custom-button"
                role="link"
            >
                Back to home
            </Link>
        </>
    );
};
